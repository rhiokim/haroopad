;(function() {
  var gui, path = require('path'),
    cp = require('child_process'),
    fs, watchr, readDir, optimist;

  /* node-webkit gui */
  global.gui = gui = require('nw.gui');
  global.Shell = gui.Shell;
  global.Clipboard = gui.Clipboard;
  global.App = gui.App;
  global.Manifest = gui.App.manifest;

  // prevent memory leak detect
  process.setMaxListeners(0);

  switch (process.platform) {
    case 'win32':
      global.EXECPATH = path.join(process.execPath, '../');
      break;
    case 'darwin':
      global.EXECPATH = path.join(process.execPath, '../../../../../');
      break;
    case 'linux':
      global.EXECPATH = path.join(process.execPath, '../');
      break;
  }

  global.mdexts = [ 'md', 'mmd', 'markdown', 'mdown', 'markdn', 'mkd', 'mkdn', 'mdwn',
                  'mdtxt', 'mdtext', 'mdml' ];

  /* system path */
  global.PATHS = {
    node_modules: path.join(global.EXECPATH, 'Libraries', '.node_modules'),
    locales: path.join(global.EXECPATH, 'Libraries', '.locales'),
    docs: path.join(global.EXECPATH, 'Libraries', '.docs'),
    css_code: path.join(global.EXECPATH, 'Libraries', '.css', 'code'),
    js: path.join(global.EXECPATH, 'Libraries', '.js'),
    theme_res_editor: path.join(global.EXECPATH, 'Resources', 'Themes', 'editor'),
    theme_res_viewer: path.join(global.EXECPATH, 'Resources', 'Themes', 'viewer'),
    theme_dest_editor: path.join(global.App.dataPath, 'Themes', 'editor'),
    theme_dest_viewer: path.join(global.App.dataPath, 'Themes', 'viewer'),
    db: path.join(global.App.dataPath, 'LevelDB'),
    tmp: path.join(global.App.dataPath, '.tmp')
  };

  //add node main module path
  process.mainModule.paths = [global.PATHS.node_modules];

  fs = require('fs-extra');
  optimist = require('optimist').boolean('f');
  readDir = require('readdir');

  /* load locales */
  global.LANGS = fs.readFileSync(path.join(global.PATHS.locales, 'locales.json'));
  global.LANGS = JSON.parse(global.LANGS);
  
  /* cli arguments */
  global.argv = optimist.parse(gui.App.argv);

  /* temporary */
  fs.mkdirsSync(global.PATHS.tmp);

  /* level db */
  fs.mkdirsSync(global.PATHS.db);

  /* native themes */
  function loadUserThemes(dir) {
    var csses = readDir.readSync(dir, ['*.css'], readDir.CASELESS_SORT);
    var name, themes = [];

    csses.forEach(function(css, idx) {
      name = path.basename(css);

      if (name.charAt(0) != '.') {
        name = name.replace('.css', '');
        themes.push(name);
      }
    });

    return themes;
  }

  /* copy native resources */
  (function() {
    var files, isExist, source, dest;

    var editorSource = global.PATHS.theme_res_editor;
    var markdownSource = global.PATHS.theme_res_viewer;

    var editorDest = global.PATHS.theme_dest_editor;
    var markdownDest = global.PATHS.theme_dest_viewer;

    fs.mkdirpSync(editorDest);
    fs.mkdirpSync(markdownDest);

    files = readDir.readSync(editorSource, ['**.css']);

    files.forEach(function(file) {
      dest = path.join(editorDest, file);
      source = path.join(editorSource, file);

      isExist = fs.existsSync(dest);

      if (!isExist) {
        try {
          fs.copySync(source, dest);
        } catch (e) {}
      }

    });

    files = readDir.readSync(markdownSource, ['**.css']);

    files.forEach(function(file) {
      dest = path.join(markdownDest, file);
      source = path.join(markdownSource, file);

      isExist = fs.existsSync(dest);

      if (!isExist) {
        try {
          fs.copySync(source, dest);
        } catch (e) {}
      }

    });
  })();

  global.THEMES = {};
  global.THEMES.user = {};
  global.THEMES.user.editor = loadUserThemes(global.PATHS.theme_dest_editor);
  global.THEMES.user.viewer = loadUserThemes(global.PATHS.theme_dest_viewer);
  global.THEMES.editor = ['default', '3024-day', '3024-night', 'ambiance-mobile', 'ambiance',
    'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant', 'erlang-dark',
    'lesser-dark', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light',
    'pastel-on-dark', 'rubyblue', 'solarized dark', 'solarized light', 'the-matrix',
    'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light'
  ];
  global.THEMES.viewer = ['clearness', 'clearness-dark', 'node-dark', 'github', 'haroopad',
    'solarized-dark', 'solarized-light', 'metro-vibes', 'metro-vibes-dark', 'wood', 'wood-ri'
  ];
  global.THEMES.code = ['default', 'arta', 'ascetic', 'atelier-dune.dark', 'atelier-dune.light',
    'atelier-forest.dark', 'atelier-forest.light', 'atelier-heath.dark', 'atelier-heath.light',
    'atelier-lakeside.dark', 'atelier-lakeside.light', 'atelier-seaside.dark', 'atelier-seaside.light',
    'brown_paper', 'codepen-embed', 'color-brewer', 'dark', 'docco', 'far', 'foundation', 'github', 'googlecode',
    'hybrid', 'idea', 'ir_black', 'kimbie.dark', 'kimbie.light', 'magula', 'mono-blue', 'monokai', 
    'monokai_sublime', 'obsidian', 'paraiso.dark', 'paraiso.light', 'pojoaque', 'railscasts', 'rainbow', 
    'school_book', 'solarized_dark', 'solarized_light', 'sunburst', 'tomorrow', 'tomorrow-night-blue', 
    'tomorrow-night-bright', 'tomorrow-night-eighties', 'tomorrow-night', 'vs', 'xcode', 'zenburn'
  ];
  

  global.SHORTCUTS = {
    /* app */
    'new_window':         {key:'n', modifiers:'cmd'},//'defmod-n',
    'save':               {key:'s', modifiers:'cmd'},//'defmod-s',
    'save_as':            {key:'s', modifiers:'cmd-shift'},//'defmod-shift-s',
    'open':               {key:'o', modifiers:'cmd'},//'defmod-o',
    'send_email':         {key:'e', modifiers:'cmd-shift'},//'defmod-shift-e',
    'html_copy_to_clip':  {key:'c', modifiers:'cmd-shift'},//'defmod-shift-c',
    'shtml_copy_to_clip': {key:'c', modifiers:'cmd-shift-alt'},//'defmod-shift-alt-c',
    'export_html':        {key:'x', modifiers:'cmd-shift'},//'defmod-shift-x',
    'close':              {key:'w', modifiers:'cmd'},//'defmod-w',
    'close_win':          {key:'f4', modifiers:'cmd'},//'defmod-f4',
    'show_preference':    {key:',', modifiers:'cmd'},//'defmod-,',
    'print':              {key:'p', modifiers:'cmd'},//'defmod-p',
    'exit':               {key:'q', modifiers:'cmd'},//'defmod-q',

    /* view */
    'perspective_edit_view':    {key:'1', modifiers:'shift-ctrl'},//'shift-ctrl-1',
    'perspective_view_edit':    {key:'2', modifiers:'shift-ctrl'},//'shift-ctrl-2',
    'perspective_only_edit':    {key:'3', modifiers:'shift-ctrl'},//'shift-ctrl-3',
    'perspective_only_view':    {key:'4', modifiers:'shift-ctrl'},//'shift-ctrl-4',
    'perspective_set_default':  {key:'\\', modifiers:'shift-ctrl'},//'shift-ctrl-\\',

    'perspective_move_right': {key:']', modifiers:'shift-ctrl-alt'},//'shift-ctrl-alt-]',
    'perspective_move_left':  {key:'[', modifiers:'shift-ctrl-alt'},//'shift-ctrl-alt-[',
    'perspective_minus_view': {key:']', modifiers:'shift-ctrl'},//'shift-ctrl-]',
    'perspective_plus_view':  {key:'[', modifiers:'shift-ctrl'},//'shift-ctrl-[',

    'toggle_line_number':     {key:'g', modifiers:'shift-ctrl'},//'shift-ctrl-g',
    'show_markdown_help':     {key:'h', modifiers:'shift-ctrl'},//'shift-ctrl-h',
    'toggle_vim_key_binding': {key:'y', modifiers:'shift-ctrl'},//'shift-ctrl-y',
    'show_table_of_content':  {key:'u', modifiers:'shift-ctrl'},//'shift-ctrl-u',
    'enter_fullscreen':       {key:'enter', modifiers:'cmd'},//'defmod-enter',
    'enter_fullscreen_win':   {key:'f11', modifiers:'cmd'},//'defmod-f11',
    'escape_fullscreen':      {key:'esc', modifiers:''},//'esc esc',
    'enter_presentation':     {key:'p', modifiers:'cmd-alt'},//'defmod-alt-p',
    'enter_presentation_win': {key:'p', modifiers:'cmd-alt'},//'defmod-alt-p',
    'editor_font_size_up':    {key:'up', modifiers:'alt'},//'alt-up',
    'editor_font_size_down':  {key:'down', modifiers:'alt'},//'alt-down',
    'viewer_font_size_up':    {key:'up', modifiers:'shift-alt'},//'shift-alt-up',
    'viewer_font_size_down':  {key:'down', modifiers:'shift-alt'},//'shift-alt-down',

    'cut':                  {key:'x', modifiers:'cmd'},//'defmod-x',
    'copy':                 {key:'c', modifiers:'cmd'},//'defmod-c',
    'paste':                {key:'v', modifiers:'cmd'},//'defmod-v',
    'select_all':           {key:'a', modifiers:'cmd'},//'defmod-a',
    'delete_line':          {key:'d', modifiers:'cmd'},//'defmod-d',
    'undo':                 {key:'z', modifiers:'cmd'},//'defmod-z',
    'redo':                 {key:'z', modifiers:'cmd-shift'},//'defmod-shift-z',
    'go_to_doc_start':      {key:'up', modifiers:'cmd'},//'defmod-up',
    'go_to_doc_end1':       {key:'end', modifiers:'cmd'},//'defmod-end',
    'go_to_doc_end2':       {key:'down', modifiers:'cmd'},//'defmod-down',
    'go_to_group_left':     {key:'left', modifiers:'alt'},//'alt-left',
    'go_to_group_right':    {key:'right', modifiers:'alt'},//'alt_right',
    'go_to_line_start':     {key:'left', modifiers:'cmd'},//'defmod-left',
    'go_to_line_end':       {key:'right', modifiers:'cmd'},//'defmod-right',
    'delete_group_before':  {key:'backspace', modifiers:'alt'},//'alt-backspace',
    'delete_group_after1':  {key:'backspace', modifiers:'ctrl-alt'},//'ctrl-alt-backspace',
    'delete_group_after2':  {key:'delete', modifiers:'alt'},//'alt-delete',
    'indent_less':          {key:'[', modifiers:'cmd'},//'defmod-[',
    'indent':               {key:']', modifiers:'cmd'},//'defmod-]',

    'folding':              {key:'q', modifiers:'ctrl'},//'Ctrl-Q',

    /* pad */
    'insert_date_time': {key:'d', modifiers:'shift-ctrl'},//'shift-ctrl-d',

    /* markdown */
    'insert_md_header1':         {key:'1', modifiers:'cmd'},//'defmod-1',
    'insert_md_header2':         {key:'2', modifiers:'cmd'},//'defmod-2',
    'insert_md_header3':         {key:'3', modifiers:'cmd'},//'defmod-3',
    'insert_md_header4':         {key:'4', modifiers:'cmd'},//'defmod-4',
    'insert_md_header5':         {key:'5', modifiers:'cmd'},//'defmod-5',
    'insert_md_header6':         {key:'6', modifiers:'cmd'},//'defmod-6',
    'insert_md_bold':            {key:'b', modifiers:'cmd'},//'defmod-B',
    'insert_md_italic':          {key:'i', modifiers:'cmd'},//'defmod-I',
    'insert_md_link':            {key:'l', modifiers:'cmd'},//'defmod-L',
    'insert_md_underline':       {key:'y', modifiers:'cmd'},//'defmod-Y',
    'insert_md_inline_code':     {key:'k', modifiers:'cmd'},//'defmod-K',
    'insert_md_embed':           {key:'e', modifiers:'cmd'},//'defmod-E',
    'insert_md_strike':          {key:'u', modifiers:'cmd'},//'defmod-U',
    'insert_md_highlight':       {key:'t', modifiers:'cmd'},//'defmod-T',
    'insert_md_fenced_code':     {key:'', modifiers:'cmd'},//'defmod-`',
    'insert_md_task':            {key:'c', modifiers:'shift-ctrl'},//'Shift-Ctrl-T',
    'insert_md_image':           {key:'i', modifiers:'shift-ctrl'},//'Shift-Ctrl-I',
    'insert_md_footnotes':       {key:'f', modifiers:'shift-ctrl'},//'Shift_Ctrl-F',
    'insert_md_footnotes_ref':   {key:'r', modifiers:'shift-ctrl'},//'Shift-Ctrl-R',
    'insert_md_toc':             {key:'t', modifiers:'shift-ctrl'},//'Shift-Ctrl-T',
    'insert_md_ordered_list':    {key:'o', modifiers:'shift-ctrl'},//'Shift-Ctrl-O',
    'insert_md_unordered_list':  {key:'l', modifiers:'shift-ctrl'},//'Shift-Ctrl-L',
    'insert_md_math_inline':     {key:'j', modifiers:'shift-ctrl'},//'Shift-Ctrl-J',
    'insert_md_math_block':      {key:'m', modifiers:'shift-ctrl'},//'Shift-Ctrl-M',
    'insert_md_blockquote':      {key:'q', modifiers:'shift-ctrl'},//'Shift-Ctrl-Q',
    'insert_md_section_break':   {key:'enter', modifiers:'shift-alt'},//'Shift-Alt-Enter',
    'insert_md_page_break':      {key:'enter', modifiers:'shift-ctrl'},//'Shift-Ctrl-Enter',
    'insert_md_sentence_break':  {key:'enter', modifiers:'shift-ctrl-alt'},//'Shift-Ctrl-Alt-Enter',

    /* finding */
    'start_search':     {key:'f', modifiers:'cmd'},//'defmod-f',
    'find_next':        {key:'g', modifiers:'cmd'},//'defmod-g',
    'find_previous':    {key:'g', modifiers:'cmd-shift'},//'defmod-shift-g',
    'replace':          {key:'f', modifiers:'cmd-alt'},//'defmod-alt-f',
    'replace_win':      {key:'f', modifiers:'shift-ctrl'},//'shift-ctrl-f',
    'replace_all':      {key:'f', modifiers:'cmd-shift-alt'},//'defmod-shift-alt-f',
    'replace_all_win':  {key:'r', modifiers:'shift-ctrl'},//'shift-ctrl-r',

    /* preference */
    'close-preference': {key:'esc', modifiers:''},//'esc'
  };

  var p, shortcut, SHORTCUTS = global.SHORTCUTS;
  if (process.platform !== 'darwin') {
    for (p in SHORTCUTS) {
      shortcut = SHORTCUTS[p];
      shortcut.modifiers = shortcut.modifiers.replace('cmd', 'ctrl');
    }
  }
})();
