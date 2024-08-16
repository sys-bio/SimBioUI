const corsProxyUrl = "https://corsproxy.io/?";

/**
 * @description Represents the inability to retrieve data from the database.
 */
const unableToRetrieve = {
  name: "Unable to retrieve data from the database",
  id: "unable-to-retrieve",
  description: ""
};

/**
 * @description Represents when no results are found for a query.
 */
const noResultsFound = {
  name: "No results found",
  id: "no-results-found",
  description: ""
};

/**
 * @description Represents valid ontology IDs.
 */
const validOntologyIds = [
  "cl", // Cell Type Ontology
  "go", // Gene Ontology
  "pr", // Protein Ontology
  "obi", // Ontology for Biomedical Investigations
  "fma", // Foundation Model of Anatomy
  "ma"  // Mouse Adult Gross Anatomy
];

/**
 * @description Asynchronously searches the ChEBI database.
 * @param search Holds query information.
 * @param size Number of results to return.
 * @returns {Promise<AnnotationInfo[] | undefined>} A promise that resolves to an array of AnnotationInfo objects if successful,
 * otherwise undefined.
 */
export async function searchChebi(search, size) {
  try {
    const queryText = search.target.value.trim();
    if (size <= 0 || queryText.length === 0) {
      return [];
    }

    const response = await fetch(
      corsProxyUrl + encodeURIComponent(`https://www.ebi.ac.uk/webservices/chebi/2.0/test/getLiteEntity?search=${queryText}&searchCategory=a&maximumResults=${size}&starsCategory=ALL`)
    );

    if (!response.ok) {
      return undefined;
    }

    const xmlString = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const fault = xmlDoc.querySelector("S\\:Fault");
    if (fault) {
      throw new Error("Unable to establish a connection to ChEBI.");
    }

    const listElements = xmlDoc.querySelectorAll("ListElement");

    const info = await Promise.all(
      Array.from(listElements).map(async element => {
        const chebiId = element.querySelector("chebiId").textContent;
        const description = await getCompleteChebiEntity(chebiId);

        return {
          id: chebiId,
          name: element.querySelector("chebiAsciiName").textContent,
          description: description,
          link: `http://identifiers.org/chebi/${chebiId}`
        };
      })
    );

    return info;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * @description Retrieves the specific information for a given ChEBI ID
 * @param id The ChEBI ID
 * @returns {Promise<string>} A promise holding the definition of the species (if it exists), otherwise an empty string.
 */
async function getCompleteChebiEntity(id) {
  try {
    const response = await fetch(
      corsProxyUrl + encodeURIComponent(`https://www.ebi.ac.uk/webservices/chebi/2.0/test/getCompleteEntity?chebiId=${id}`)
    );

    if (response.ok) {
      const xmlString = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      const definition = xmlDoc.querySelector("definition");
      return definition ? definition.textContent : "";
    }
  } catch (e) {
    console.log(e);
    return "";
  }
}

/**
 * @description Asynchronously searches the UniProt database.
 * @param search Holds query information.
 * @param size Number of results to return.
 * @returns {Promise<AnnotationInfo[] | undefined>} A promise that resolves to an array of AnnotationInfo objects if successful,
 * otherwise undefined.
 */
export async function searchUniProt(search, size) {
  try {
    const queryText = search.target.value.trim();
    if (size <= 0 || queryText.length === 0) {
      return [];
    }

    const response = await fetch(
      `https://rest.uniprot.org/uniprotkb/search?fields=accession%2Cid%2Cprotein_name%2Corganism_name&query=${queryText}&size=${size}`
    );

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    const info = data.results.map(result => ({
      id: result.uniProtkbId,
      name: result.proteinDescription?.recommendedName?.fullName?.value || result.proteinDescription?.submissionNames[0]?.fullName?.value,
      description: "", // Could be enhanced with detailed API calls for full descriptions
      link: `https://www.uniprot.org/uniprotkb/${result.primaryAccession}/entry`,
      organism: {
        scientificName: result.organism.scientificName,
        commonName: result.organism.commonName || ""
      }
    }));

    return info;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * @description Asynchronously searches the Rhea database.
 * @param search Holds query information.
 * @param size Number of results to return.
 * @returns {Promise<AnnotationInfo[] | undefined>} A promise that resolves to an array of AnnotationInfo objects if successful;
 * otherwise, undefined.
 */
export async function searchRhea(search, size) {
  try {
    const queryText = search.target.value.trim();
    if (size <= 0 || queryText.length === 0) {
      return [];
    }

    const response = await fetch(
      `https://www.rhea-db.org/rhea/?query=${queryText}&columns=rhea-id,equation,ec&format=tsv&limit=${size}`
    );

    if (!response.ok) {
      return undefined;
    }

    const data = await response.text();
    const lines = data.split("\n").slice(1);

    const info = lines
      .filter(line => line.trim())
      .map(line => {
        const [rheaId, equation, ecNumbers] = line.split("\t");
        const ec = ecNumbers ? ecNumbers.split(";EC:").filter(Boolean) : [];
        return {
          id: rheaId.substring(5),
          name: equation,
          description: "",
          link: `https://www.rhea-db.org/rhea/${rheaId.substring(5)}`,
          ec: ec
        };
      });

    return info;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * @description Asynchronously searches the Ontology database.
 * @param search Holds query information.
 * @param size Number of results to return.
 * @param ontologyId Filters the ontology type; must be one of the valid ontology IDs.
 * @returns {Promise<AnnotationInfo[] | undefined>} A promise that resolves to an array of AnnotationInfo objects if successful;
 * otherwise, undefined.
 */
export async function searchOntology(search, size, ontologyId) {
  try {
    const queryText = search.target.value.trim();
    if (size <= 0 || queryText.length === 0 || !validOntologyIds.includes(ontologyId)) {
      return [];
    }

    const response = await fetch(
      `https://www.ebi.ac.uk/ols4/api/v2/entities?search=${queryText}&size=${size}&ontologyId=${ontologyId}&lang=en`
    );

    if (!response.ok) {
      return undefined;
    }

    const data = await response.json();
    const info = data.elements.map(result => ({
      id: result.curie,
      name: result.label,
      description: result.definition?.value || result.description || "",
      link: result.iri
    }));

    return info;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

/**
 * Generic function to add keyup event listener for search functionality.
 */
function addKeyupListener(ref, searchFunc, setLoading, setSearchResults, size, ...additionalParams) {
  let timer;
  const waitTime = 1000;
  const browseInput = ref.current;

  if (browseInput) {
    browseInput.addEventListener("keyup", async val => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        setLoading(true);
        setSearchResults([]);

        const results = await searchFunc(val, size, ...additionalParams);

        setLoading(false);
        setSearchResults(results.length ? results : [noResultsFound]);
      }, waitTime);
    });
  }
}

export function getChebi(setLoading, setSearchResults, ref) {
  addKeyupListener(ref, searchChebi, setLoading, setSearchResults, 100);
}

export function getUniProt(setLoading, setSearchResults, ref) {
  addKeyupListener(ref, searchUniProt, setLoading, setSearchResults, 100);
}

export function getRhea(setLoading, setSearchResults, ref) {
  addKeyupListener(ref, searchRhea, setLoading, setSearchResults, 100);
}

export function getOntology(setLoading, setSearchResults, ref, ontologyId) {
  addKeyupListener(ref, searchOntology, setLoading, setSearchResults, 100, ontologyId);
}
