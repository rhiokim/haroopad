# Rails 3.2 playground [![Build Status](https://secure.travis-ci.org/hongymagic/glossy-rails.png)](http://travis-ci.org/hongymagic/glossy-rails)

This project was created so I could better understand Rails 3.2 and `ruby-lang`. Occasional fuck ups _are_ okay.

## Still to learn

1. <del>How model validation works :client, :server, :anything and :everything</del>
2. Request life-cycle :filters, :actions, :redirects
3. Fucking `routes`.
4. <del>Why do every `gem` introduce a new fucking `config` file</del>
5. <del>Introduce some client-side scripts :serve them correctly</del>
6. Write some tests
7. Write some `Selenium` tests
8. Write some `db:seeds`
9. Read more about Rails 3.2 here: http://guides.rubyonrails.org/3_2_release_notes.html

## TODO

In the order I wish to implement:

1. Complete Backbone.js routes and views
2. <del>Convert views/templates to use `Mustache` (this is so much easier on `Node.js`)</del>
3. <del>Re-create server views that work without Backbone.js</del>
4. <del>Styling, add some CSS3 animations (without JS hooks for triggering animation)</del>

## Findings

I expect to expand on these findings below sometime soon. In the meantime, you'll have to put up with vague, abstract points notations.

1. Rails 3.2 + `CoffeeScript` – I will never understand why. I personally think `CoffeeScript` integration should be a choice, not default
2. Basic model validation seems pretty simple, and at this stage the next step in this direction would be to find out how to write `custom_validators` and hooking them up to models
3. Configuration for new `gems` are _minimal_. I like the idea of `initializers`
4. The new [Asset Pipeline](http://edgeguides.rubyonrails.org/asset_pipeline.html) is fairly trivial
