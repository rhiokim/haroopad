({
    appDir: "src",
    baseUrl: "js/app",
    dir: "./build/app.nw",
    mainConfigFile: 'src/js/app/main.js',
    modules: [
      {
        name: "main"
      }
    ],
    uglify: {
        max_line_length: 100
    }
})