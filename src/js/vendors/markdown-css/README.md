## introduce
standard markdown style sheets & themes

### how to install

```bash
$ git clone https://github.com/rhiokim/markdown-css.git
$ grunt

Running "less:development" (less) task
File build/markdown.css created.
File build/clearness-dark.css created.
File build/clearness.css created.
File build/github.css created.
File build/solarized-dark.css created.
File build/solarized-light.css created.
```

### themes

* Github
* Clearness Dark / Light
* Solarized Dark / Light

### how to create your style

#### light face theme
#### dark face theme

### how use

```xml
<link rel="stylesheet" href="assets/css/markdown.css">
<link rel="stylesheet" href="assets/css/[your theme].css">

<body>
  <div class="markdown [your theme]">
    converted html
  </div>
</body>
```

### advanced 

#### import external libraries

#### structure less of theme

* before.less
* theme.less
> ```css
> @import "before";
> 
> .theme {
> }
>
> @import "after";
>```

* after.less
* plugins.less

### build

##### requirements

grunt-cli

```
npm install grunt-cli -g
```



## license
MIT