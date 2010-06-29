#! /usr/bin/env rake

BUILD_NUMBER      = '0.1 (alpha)'
SOURCE_DIRECTORY  = 'src'
BUILD_DIRECTORY   = 'build'
BUILD_FILENAME    = 'sinko.min.js'

task :default => [:compile, :version]

desc "Compiles source files into one minified file." 
task :compile do   
  files = [];
  files << 'sinko.js'

  compiler_command = File.dirname(__FILE__) + '/compiler.jar'
  
  files.each do |file|  
    compiler_command += ' --js='
    compiler_command += File.join(File.dirname(__FILE__), '..', SOURCE_DIRECTORY, file)
  end
  
  compiler_command += ' --js_output_file='
  compiler_command += File.join(File.dirname(__FILE__), '..', BUILD_DIRECTORY, BUILD_FILENAME)
  
  system("java -jar " + compiler_command)
end

desc "Adds a version header to the build file." 
task :version do
  build_file = File.join(File.dirname(__FILE__), '..', BUILD_DIRECTORY, BUILD_FILENAME)
  
  if File.exists?(build_file)
    output_string = "// sinko.js version " + BUILD_NUMBER + " - http://github.com/dies-el/sinko\n";
  
    File.open(build_file, 'r') do |file|
      output_string += file.read
    end
  
    File.open(build_file, 'w+') do |file|
      file.puts(output_string)
    end
  end
end
