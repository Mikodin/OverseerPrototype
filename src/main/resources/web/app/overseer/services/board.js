app.service('board', BoardService);

BoardService.$inject = ['$http', '$state'];

function BoardService($http, $state) {

  var allBoards = [];

  function BoardObject() {
    this.id = '';
    this.name = '';
    this.projects = [];
    this.workFlow = [];
  }

  function ProjectObject() {
    this.id = '';
    this.name = '';
    this.completion = 0;
    this.team = [];
    this.teamString = '';
    this.tasks = [];
    this.workFlow = [];
    this.startDate = '';
    this.startDateStr = '';
    this.endDate = '';
    this.endDateStr = '';
    this.effort = 0;
  }

  function WorkFlowObject() {
    this.name = '';
    this.id = '';
    this.tasks = [];
  }

  function TaskObject() {
    this.name = '';
    this.workFlow = '';
    this.workFlowId = '';
    this.assignedTo = '';
    this.dueDate = '';
  }

  function Member() {
    this.name = '';
    this.userName = '';
    this.permissions = [];
  }

  /**
   * constructBoards
   * Parses the Kanbanik Boards object from the API
   * Puts the data into a more organized allBoards[{BoardObject}]
   * Calls parseTasks, parseWorkFlow, and parseTeam
   *
   * @param {Object} boards
   * @returns {Object} allBoards
   */
  this.constructBoards = function(boards) {
    console.log(boards);
    for (var i = 0; i < boards.values.length; i++) {
      var tempBoard = new BoardObject();
      var tempProjects = [];

      tempBoard.id = boards.values[i].board.id;
      tempBoard.name = boards.values[i].board.name;
      tempBoard.workFlow = boards.values[i].board.workflow.workflowitems;

      for (var j = 0; j < boards.values[i].projectsOnBoard.values.length; j++) {
        var tempProject = new ProjectObject();

        tempProject.id = boards.values[i].projectsOnBoard.values[j].id;
        tempProject.name = boards.values[i].projectsOnBoard.values[j].name;

        // Create the tasks, workflow and find the team members of this project
        tempProject.tasks = parseTasks(tempProject.id, boards.values[i].board.tasks);

        // Parse dates for start time of project, end date of project, effort(Difference between the latest and earliest task)
        // and put these dates into readable, short strings
        tempDates = parseProjDates(tempProject);
        tempProject.startDate = tempDates.earliestDate;
        tempProject.startDateStr = formatDateStr(tempDates.earliestDate);
        tempProject.endDate = tempDates.latestDate;
        tempProject.endDateStr = formatDateStr(tempDates.latestDate);
        tempProject.effort = calcEffort(tempProject.endDate,tempProject.startDate);

        tempProject.workFlow = parseWorkFlow(boards.values[i].board.workflow.workflowitems, tempProject.tasks);
        tempProject.team = parseTeam(tempProject.tasks);

        // Construct teamString
        for (var k = 0; k < tempProject.team.length; k++) {
          tempProject.teamString += tempProject.team[k].name;
          if (k < tempProject.team.length - 1) {
            tempProject.teamString += ', ';
          }
        }

        tempProjects.push(tempProject);
        tempBoard.projects = tempProjects;

      }

      allBoards.push(tempBoard);
    }
    console.log('All Boards Object');
    console.log(allBoards);
    return allBoards;
  };

  /**
   * parseProjDates
   * Goes through each task in a project and determines the start of the project based on
   * the earliest task, and determines the end of the project based on the latest scheduled task
   *
   * @param {Object} project
   * @returns {JSON}
   */
  function parseProjDates(project) {

    function Dates() {
      this.earliestDate = '';
      this.latestDate = '';
    }

    var dates = new Dates();

    for (var i = 0; i < project.tasks.length; i++) {
      if (project.tasks[i].dueDate !== undefined) {

        if (dates.earliestDate === '') {
          dates.earliestDate = project.tasks[i].dueDate;
        } else if (project.tasks[i].dueDate < dates.earliestDate) {
          dates.earliestDate = project.tasks[i].dueDate;
        }

        if (dates.latestDate === '') {
          dates.latestDate = project.tasks[i].dueDate;
        } else if (project.tasks[i].dueDate > dates.latestDate) {
          dates.latestDate = project.tasks[i].dueDate;
        }
      }

    }
    return dates;
  }

  /**
   * formatDateStr
   * Formats the date object and returns a string in the desired format mm/dd/yyyy
   *
   * @param {Date} date
   * @returns {String}
   */
  function formatDateStr(date) {
    var monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    if (date !== '') {
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return monthNames[monthIndex] + ' ' + day + ' ' +  year;
    } else {
      return '--';
    }

  }

  /**
   * calcEffort
   * Subtracts the two Date objects and returns the difference in days
   *
   * @param {Date} start
   * @param {Date} end
   * @returns {Number}
   */
  function calcEffort(start, end) {
    console.log('Get Effort');
    console.log(start);
    console.log(end);
    var timeDiff = Math.abs(end - start);
    var effort = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return effort;
  }

  /**
   * parseTasks
   *
   * Adds tasks to their respective project
   *
   * @param {int} projectId
   * @param {Object} tasks
   * @returns {Object}
   */
  function parseTasks(projectId, tasks) {
    var parsedTasks = [];

    if (tasks !== undefined) {
      for (var k = 0; k < tasks.length; k++) {
        if (tasks[k].projectId === projectId) {
          var tempTask = new TaskObject();
          tempTask.id = tasks[k].id;
          tempTask.name = tasks[k].name;
          tempTask.assignedTo = tasks[k].assignee;
          tempTask.workFlowId = tasks[k].workflowitemId;
          tempTask.dueDate = new Date(tasks[k].dueDate);
          tempTask.dueDateString = tasks[k].dueDate;
          parsedTasks.push(tempTask);
        }
      }
    }
    return parsedTasks;
  }

  /**
   * parseWorkFlow
   *
   * Adds Tasks into their respective WorkFlow
   *
   * @param {Object} workFlowItems
   * @param {Object} tasks
   * @returns {Object}
   */
  function parseWorkFlow(workFlowItems, tasks) {
    var parsedWorkFlow = [];

    for (var i = 0; i < workFlowItems.length; i++) {
      var workFlow = new WorkFlowObject();
      workFlow.name = workFlowItems[i].name;
      workFlow.id = workFlowItems[i].id;

      for (var j = 0; j < tasks.length; j++) {
        if (workFlow.id === tasks[j].workFlowId) {
          workFlow.tasks.push(tasks[j]);
        }
      }
      parsedWorkFlow.push(workFlow);
    }
    return parsedWorkFlow;
  }

  /**
   * parseTeam
   *
   * Parses team members from who is assigned to tasks of the same project
   *
   * @param {Object} projectTasks
   * @returns {Object}
   */
  function parseTeam(projectTasks) {
    var team = [];

    for (var i = 0; i < projectTasks.length; i++) {
      if (projectTasks[i].assignedTo !== undefined) {
        var member = new Member();
        member.name = projectTasks[i].assignedTo.realName;
        member.userName = projectTasks[i].assignedTo.userName;
        member.permissions = projectTasks[i].assignedTo.permissions;
        if (!containsMember(team, member)) {
          team.push(member);
        }
      }
    }
    return team;
  }

  /**
   * containsMember
   * Checks to see if a member is already in the team
   *
   * @param {Array} teamMembers
   * @param {Object} member
   * @returns {Boolean}
   */
  function containsMember(teamMembers, member) {
    if (teamMembers.length === 0) {
      return false;
    }
    for (var i = 0; i < teamMembers.length; i++) {
      if (member.userName === teamMembers[i].userName) {
        return true;
      }
    }
    return false;
  }

  /**
   * getBoard
   * Returns the board with the associated id
   *
   * @param {int} id
   * @returns {Object}
   */
  this.getBoard = function(id) {
    for (var i = 0; i < allBoards.length; i++) {
      if (allBoards[i].id === id) {
        return allBoards[i];
      }
    }
  };

  /**
   * getAllBoards
   *
   * Performs a GET request to get all boards in Kanbanik
   *
   * @param {int} sessionId
   * @returns {$q} promise if it succeeds
   */
  this.getAllBoards = function(sessionId) {
    var testUrl = 'http://localhost:8080/kanbanik/api?command={"commandName":"getAllBoardsWithProjects","includeTasks":true,"sessionId":' +
      '"' + sessionId + '"' + '}';
    return $http({
      method: 'GET',
      url: testUrl,
    }).success(function(response) {
      return response;
    });
  };
}
