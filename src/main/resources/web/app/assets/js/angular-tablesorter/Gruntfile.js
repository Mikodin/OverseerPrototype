module.exports = function(grunt) {
	
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
    grunt.initConfig({
        
		pkg: grunt.file.readJSON('package.json'),    
        
		concurrent: {
		    watch: {
		        tasks: ['watch'],
		        options: {
		            logConcurrentOutput: true
		        }
		    }
		},
        uglify: {
	        build: {
		        src: 'angular-tablesorter.js',
		        dest: 'angular-tablesorter.min.js'
	        }
        },
		
		/* Run tasks when needed */
		watch: {
			options:{
				livereload: true
			},
			js: {
                files: ['angular-tablesorter.js'],
                tasks: ['uglify'],
            }			
		}		     		    

    });
    
	grunt.registerTask('default', ['concurrent:watch']);    

}; 