/**
 * Initializing projectlist in localStorage
 */
function initializeLocalStorage() {
    let emtptyJSON = "[]";
    localStorage.setItem("projectList", emtptyJSON);
}

/**
 * Get all projects (as an array of JSON objects) in localStorage
 */
function getAllProjects() {
    if (localStorage.getItem("projectList") == null) initializeLocalStorage();
    return JSON.parse(localStorage.getItem("projectList"));
}

/**
 * Get a single project (as a JSON object) in localStorage
 * @param {string} name is the name of the project
 */
function getProject(name) {
    if (localStorage.getItem("projectList") == null) initializeLocalStorage();
    return JSON.parse(localStorage.getItem("projectList")).find(project => project.name === name);
}

/**
 * Add a single project (as a JSON object) in localStorage
 * @param {object} project is the project to add
 */
function createProject(project) {
    if (localStorage.getItem("projectList") == null) initializeLocalStorage();
    let projectList = JSON.parse(localStorage.getItem("projectList"));
    if (projectList.find(p => p.name === project.name)) {
        alert(project.name + 'Project already exists!');
        return false;
    } else {
        projectList.push(project);
        localStorage.setItem("projectList", JSON.stringify(projectList));
        refreshProjectList();
        return true;
    }
}

/** delete specified project from the list
 * @param {string} name of the project to be deleted
  */
function deleteProject(name) {
    if (localStorage.getItem("projectList") == null) {
        initializeLocalStorage();
        return false;
    }
    let projectList = JSON.parse(localStorage.getItem("projectList"));
    localStorage.setItem("projectList", JSON.stringify(projectList.filter(project => project.name !== name)));
    refreshProjectList();
    return true;
}

/** 
 * Update local storage to store projects
 * @param {string} state needs to be either "complete" or "incomplete" 
 */
function updateProject(name, newState) {
    deleteProject(name);
    createProject(newState);
}

function editProject(name) {
    document.getElementById('edit-modal').classList.add('open');
    document.getElementById('edit-project-name').setAttribute('placeholder', name);
    document.getElementById('edit-project-name').value = name;
}

function refreshProjectList() {
    if (localStorage.getItem("projectList") == null) initializeLocalStorage();

    let projectListView = document.getElementById('project-list');
    let addButton = document.getElementById('add-project-wrapper');

    while (projectListView.childNodes.length > 2) {
        projectListView.removeChild(projectListView.firstChild);
    }

    let projectList = JSON.parse(localStorage.getItem("projectList"));
    projectList.forEach((project) => {
        let projectItem = document.createElement('li');
        projectItem.innerHTML = `
        <a>${project.name}</a>
        <div class="project-action-container">
            <ion-icon name="create-outline" onclick="editProject('${project.name}')"></ion-icon>
            <ion-icon name="trash-outline" onclick="deleteProject('${project.name}')"></ion-icon>
        </div>`;
        projectListView.insertBefore(projectItem, addButton);
    });
}