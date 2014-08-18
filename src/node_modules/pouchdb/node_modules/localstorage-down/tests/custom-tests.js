var levelup = require('levelup')
    
module.exports.setUp = function (leveldown, test, testCommon) {
    test('setUp common', testCommon.setUp)
    test('setUp db', function (t) {
        db = leveldown(testCommon.location())
        db.open(t.end.bind(t))
    })
}

module.exports.all = function (leveldown, tape, testCommon) {

    module.exports.setUp(leveldown, tape, testCommon)

    tape('test .destroy', function(t) {
        var db = levelup('destroy-test', {db: leveldown})
        var db2 = levelup('other-db', {db: leveldown})
        db2.put('key2', 'value2', function (err) {
            t.notOk(err, 'no error')
            db.put('key', 'value', function (err) {
                t.notOk(err, 'no error')
                db.get('key', function (err, value) {
                    t.notOk(err, 'no error')
                    t.equal(value, 'value', 'should have value')
                    db.close(function (err) {
                        t.notOk(err, 'no error')
                        leveldown.destroy('destroy-test', function (err) {
                            t.notOk(err, 'no error')
                            var db3 = levelup('destroy-test', {db: leveldown})
                            db3.get('key', function (err, value) {
                                t.ok(err, 'key is not there')
                                db2.get('key2', function (err, value) {
                                    t.notOk(err, 'no error')
                                    t.equal(value, 'value2', 'should have value2')
                                    t.end()
                                })
                            })
                        })
                    })
                })
            })
        })
    })

}