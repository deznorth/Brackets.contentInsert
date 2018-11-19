/*
 * @Author: David M. Rojas Gonzalez // davidr.info
 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        DocumentManager  = brackets.getModule("document/DocumentManager"),
        Menus          = brackets.getModule("command/Menus"),
        ProjectManager = brackets.getModule("project/ProjectManager"),
        FileSystem     = brackets.getModule("filesystem/FileSystem"),
        FileUtils      = brackets.getModule("file/FileUtils");

    var pattern = /\{\{::\w*?\}\}/i;

    /* Returns the path to the requested file 
     * May return undefined */
    function getPathByFileName(fileName){
        var projectFiles = ProjectManager.getProjectRoot()._contents;
        for(var i = 0; i<projectFiles.length; i++){
            if(projectFiles[i]._name == fileName){
                return projectFiles[i]._path;
            }
        }
        console.log(`contentInsert: could not locate a file named ${fileName}`);
        alert(`contentInsert: You need to create a configuration file named ${fileName}`);
        return null;
    }

    function cleanupConfig(config){
        config = config.replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
        .replace(/\f/g, "")
        .replace(/\s+/g,"")
        .replace(/,(?=\})/g,"");
        return config;
    }

    function loadConfig(){
        var path = getPathByFileName('contentInsert.json');
        if(path != null){
            var doc = DocumentManager.getDocumentForPath(path);
            doc.done(function(document){
                console.log(JSON.parse(cleanupConfig(document.getText())));
            }).fail(function(err){
                console.log(err);
            });
        }
    }

    function checkFormat(){

    }
    
    // Function to run when the menu item is clicked
    function handleContentInsert() {
        loadConfig();
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var COMMAND_ID = "dez.contentInsert.insert";   // package-style naming to avoid collisions
    CommandManager.register("Insert Content with contentInsert", COMMAND_ID, handleContentInsert);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuItem(COMMAND_ID);
});