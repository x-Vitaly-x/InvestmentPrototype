function serializeForm($form) {
  return _.object(_.map($form.serializeArray(), function (item) {
    return [item.name, item.value];
  }));
}

var Task = Backbone.Model.extend({
  urlRoot: '/tasks'
});

var TaskList = Backbone.Collection.extend({
  model: Task,
  url: '/tasks',
  comparator: 'created_at'
});

var TasksView = Backbone.View.extend({
  events: {
    "click #new_task": "newTask",
    "click .edit_task": "editTask",
    "click .delete_task": "deleteTask",
    "submit #task_editor form": "saveTask"
  },

  initialize: function () {
    this.renderContainer();
    this.task_list = new TaskList();
    // fetch all the tasks from server
    this.task_list.fetch().then(tasks => {
      this.renderTasks();
    }, error => console.log(error));
  },

  // renders the outer container, together with its buttons
  renderContainer: function () {
    this.$el.html(HandlebarsTemplates['task_list_container']());
  },

  // renders the inner container where tasks are displayed
  renderTasks: function () {
    this.task_list.sort();
    console.log(this.task_list);
    $("#" + this.el.id + " .task_list").html(HandlebarsTemplates['tasks']({tasks: this.task_list}));
  },

  // opens the modal form for new task
  newTask: function (event) {
    event.preventDefault();
    var task = new Task();
    $("#task_editor").html(HandlebarsTemplates['task_editor']({task: task})).modal();
  },

  // opens the modal for existing task
  editTask: function (event) {
    event.preventDefault();
    var task = this.task_list.get($(event.currentTarget).data("id"));
    $("#task_editor").html(HandlebarsTemplates['task_editor']({task: task})).modal();
  },

  // saves task on the server from the modal form
  saveTask: function (event) {
    event.preventDefault();
    data = serializeForm($(event.currentTarget));
    // remove blank ids, so that backbone does not trigger put event
    if (data.id == "") {
      delete(data["id"]);
    }
    var task = new Task(data);
    task.save().then(task => {
      this.task_list.remove(task.id);
      this.task_list.add(task);
      this.renderTasks();
      $("#task_editor").modal("hide");
    }, error => {
      $("#task_editor .errors").html(error.responseJSON.join("</br>"));
    });
  },

  // removes task from the database
  deleteTask: function (event) {
    event.preventDefault();
    var task = this.task_list.get($(event.currentTarget).data("id"));
    if (confirm("Are you sure you want to delete this task?")) {
      task.destroy();
      this.renderTasks();
    }
  }
});