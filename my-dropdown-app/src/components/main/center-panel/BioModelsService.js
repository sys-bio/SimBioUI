import cache from "./BiomodelCache.json";
import { Octokit } from "@octokit/core";

class BioModelService {
  constructor() {
    this.cachedData = cache;
    this.octokit = new Octokit();
    this.url = "";
  }

  /**
   * Function to search for models using the cached data
   * @param {string} queryText - The search query text
   * @returns {Promise<Object>} - A promise containing the models returned by the search
   */
  async searchModels(queryText) {
    try {
      const models = { models: new Map() };

      for (const id in this.cachedData) {
        const modelData = this.cachedData[id];

        if (queryText.includes(" ")) {
          const queryWords = queryText.split(" ");
          if (queryWords.every(word =>
            Object.values(modelData).some(value =>
              typeof value === "string" && value.toLowerCase().includes(word.toLowerCase())
            ))) {
            models.models.set(id, this.createModel(id, modelData));
          }
        } else if (Object.values(modelData).some(value =>
          typeof value === "string" && value.toLowerCase().includes(queryText.toLowerCase())
        )) {
          models.models.set(id, this.createModel(id, modelData));
        }
      }
      return models;
    } catch (error) {
      this.throwError("Unable to fetch models from cache.");
      throw error;
    }
  }

  /**
   * Function to get a model from a GitHub repository
   * @param {string} modelId - The ID of the model to get
   * @returns {Promise<Object>} - A promise containing the model
   */
  async getModel(modelId) {
    try {
      const response = await this.octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "sys-bio",
        repo: "BiomodelsStore",
        path: `biomodels/${modelId}`,
        headers: {
          "Accept": "application/vnd.github+json"
        }
      });

      if (Array.isArray(response.data)) {
        const fileResponse = await this.octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
          owner: "sys-bio",
          repo: "BiomodelsStore",
          path: `biomodels/${modelId}/${response.data[0].name}`,
          headers: {
            "Accept": "application/vnd.github+json"
          }
        });

        if ("content" in fileResponse.data) {
          const sbmlData = decodeURIComponent(Array.prototype.map.call(atob(fileResponse.data.content), function(c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(""));

          return {
            modelId: modelId,
            sbmlData: sbmlData,
            url: this.url,
            title: this.cachedData[modelId].title,
            authors: this.cachedData[modelId].authors,
            citation: this.cachedData[modelId].citation,
            date: this.cachedData[modelId].date,
            journal: this.cachedData[modelId].journal
          };
        } else {
          this.throwError("Unable to fetch model from GitHub repository.");
          throw new Error("Unable to fetch model from GitHub repository.");
        }
      } else {
        this.throwError("Unable to fetch model from GitHub repository.");
        throw new Error("Unable to fetch model from GitHub repository.");
      }
    } catch (error) {
      this.throwError("Model not found, please choose another model.");
      throw error;
    }
  }

  /**
   * Function to display an error message
   * @param {string} error - The error message to display
   */
  throwError(error) {
    const popup = document.createElement("div");
    popup.innerHTML = error.toString();
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "white";
    popup.style.padding = "20px";
    popup.style.border = "1px solid black";
    popup.style.borderRadius = "10px";
    popup.style.zIndex = "100";
    document.body.appendChild(popup);
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 2500);
  }

  /**
   * Function to handle the biomodel search and dropdown display
   * @param {Function} setLoading - The setLoading function from the parent component
   * @param {Function} setChosenModel - The setChosenModel function from the parent component
   */
  getBiomodels(setLoading, setChosenModel) {
    const biomodelBrowse = document.getElementById("biomodel-browse");
    const dropdown = document.getElementById("biomddropdown");
    let biomodels;
    let chosenModel;

    biomodelBrowse.addEventListener("keyup", async (val) => {
      const biomodel = val;
      if (biomodel.target.value.length < 2) {
        dropdown.innerHTML = "";
        return;
      }
      setTimeout(async () => {
        setLoading(true);
        dropdown.innerHTML = "";
        biomodels = await this.searchModels(biomodel.target.value);
        if (biomodels.models.size === 0) {
          setLoading(false);
          biomodels = null;
          const li = document.createElement("li");
          li.innerHTML = "No models found";
          dropdown.innerHTML = "";
          dropdown.appendChild(li);
          return;
        }

        dropdown.style.display = "block";
        biomodels.models.forEach((model) => {
          setLoading(false);
          const a = document.createElement("a");
          a.addEventListener("click", () => {
            biomodelBrowse.value = "";
            dropdown.innerHTML = "";
            chosenModel = model.id;
            this.url = model.url;
            setChosenModel(chosenModel);
          });
          const authors = model.authors.length > 0 ? model.authors : "No authors found";
          a.innerHTML = `${model.title}<div style="color: #FD7F20;">${model.journal}, ${model.date} - ${authors}</div>`;
          dropdown.appendChild(a);
        });
      }, 300);
      document.addEventListener("click", (e) => {
        if (e.target.id !== "biomodel-browse") {
          dropdown.style.display = "none";
        }
      });
      document.addEventListener("click", (e) => {
        if (e.target.id === "biomodel-browse") {
          dropdown.style.display = "block";
        }
      });
    });
  }

  /**
   * Utility function to create a model object from cached data
   * @param {string} id - The model ID
   * @param {Object} modelData - The cached model data
   * @returns {Object} - The model object
   */
  createModel(id, modelData) {
    return {
      name: modelData.name,
      url: modelData.url,
      id: modelData.model_id,
      title: modelData.title,
      authors: modelData.authors,
      citation: modelData.citation,
      date: modelData.date,
      journal: modelData.journal
    };
  }
}

export default BioModelService;
