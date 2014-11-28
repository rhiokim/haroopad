'use strict';

var chai = require('chai');
var sinon = require('sinon');
var Buildmail = require('../src/buildmail');
var http = require('http');
var stream = require('stream');
var Transform = stream.Transform;

var expect = chai.expect;
chai.Assertion.includeStack = true;

describe('Buildmail', function() {
    it('should create Buildmail object', function() {
        expect(new Buildmail()).to.exist;
    });

    describe('#createChild', function() {
        it('should create child', function() {
            var mb = new Buildmail('multipart/mixed');

            var child = mb.createChild('multipart/mixed');
            expect(child.parentNode).to.equal(mb);
            expect(child.rootNode).to.equal(mb);

            var subchild1 = child.createChild('text/html');
            expect(subchild1.parentNode).to.equal(child);
            expect(subchild1.rootNode).to.equal(mb);

            var subchild2 = child.createChild('text/html');
            expect(subchild2.parentNode).to.equal(child);
            expect(subchild2.rootNode).to.equal(mb);
        });
    });

    describe('#appendChild', function() {
        it('should append child node', function() {
            var mb = new Buildmail('multipart/mixed');

            var child = new Buildmail('text/plain');
            mb.appendChild(child);
            expect(child.parentNode).to.equal(mb);
            expect(child.rootNode).to.equal(mb);
            expect(mb.childNodes.length).to.equal(1);
            expect(mb.childNodes[0]).to.equal(child);
        });
    });

    describe('#replace', function() {
        it('should replace node', function() {
            var mb = new Buildmail(),
                child = mb.createChild('text/plain'),
                replacement = new Buildmail('image/png');

            child.replace(replacement);

            expect(mb.childNodes.length).to.equal(1);
            expect(mb.childNodes[0]).to.equal(replacement);
        });
    });

    describe('#remove', function() {
        it('should remove node', function() {
            var mb = new Buildmail(),
                child = mb.createChild('text/plain');

            child.remove();
            expect(mb.childNodes.length).to.equal(0);
            expect(child.parenNode).to.not.exist;
        });
    });

    describe('#setHeader', function() {
        it('should set header', function() {
            var mb = new Buildmail();

            mb.setHeader('key', 'value');
            mb.setHeader('key', 'value1');
            expect(mb.getHeader('Key')).to.equal('value1');

            mb.setHeader([{
                key: 'key',
                value: 'value2'
            }, {
                key: 'key2',
                value: 'value3'
            }]);

            expect(mb._headers).to.deep.equal([{
                key: 'Key',
                value: 'value2'
            }, {
                key: 'Key2',
                value: 'value3'
            }]);

            mb.setHeader({
                key: 'value4',
                key2: 'value5'
            });

            expect(mb._headers).to.deep.equal([{
                key: 'Key',
                value: 'value4'
            }, {
                key: 'Key2',
                value: 'value5'
            }]);
        });
    });

    describe('#addHeader', function() {
        it('should add header', function() {
            var mb = new Buildmail();

            mb.addHeader('key', 'value1');
            mb.addHeader('key', 'value2');

            mb.addHeader([{
                key: 'key',
                value: 'value2'
            }, {
                key: 'key2',
                value: 'value3'
            }]);

            mb.addHeader({
                key: 'value4',
                key2: 'value5'
            });

            expect(mb._headers).to.deep.equal([{
                key: 'Key',
                value: 'value1'
            }, {
                key: 'Key',
                value: 'value2'
            }, {
                key: 'Key',
                value: 'value2'
            }, {
                key: 'Key2',
                value: 'value3'
            }, {
                key: 'Key',
                value: 'value4'
            }, {
                key: 'Key2',
                value: 'value5'
            }]);
        });
    });

    describe('#getHeader', function() {
        it('should return first matching header value', function() {
            var mb = new Buildmail();
            mb._headers = [{
                key: 'Key',
                value: 'value4'
            }, {
                key: 'Key2',
                value: 'value5'
            }];

            expect(mb.getHeader('KEY')).to.equal('value4');
        });
    });

    describe('#setContent', function() {
        it('should set the contents for a node', function() {
            var mb = new Buildmail();
            mb.setContent('abc');
            expect(mb.content).to.equal('abc');
        });
    });


    describe('#build', function() {

        it('should build root node', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                date: '12345',
                'message-id': '67890'
            }).
            setContent('Hello world!'),

            expected = 'Content-Type: text/plain\r\n' +
                'Date: 12345\r\n' +
                'Message-Id: <67890>\r\n' +
                'Content-Transfer-Encoding: 7bit\r\n' +
                'MIME-Version: 1.0\r\n' +
                '\r\n' +
                'Hello world!';

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(msg).to.equal(expected);
                done();
            });
        });

        it('should build child node', function(done) {
            var mb = new Buildmail('multipart/mixed'),
                childNode = mb.createChild('text/plain').
            setContent('Hello world!'),

            expected = 'Content-Type: text/plain\r\n' +
                'Content-Transfer-Encoding: 7bit\r\n' +
                '\r\n' +
                'Hello world!';

            childNode.build(function(err, msg) {
                msg = msg.toString();
                expect(msg).to.equal(expected);
                done();
            });
        });

        it('should build multipart node', function(done) {
            var mb = new Buildmail('multipart/mixed', {
                baseBoundary: 'test'
            }).
            setHeader({
                date: '12345',
                'message-id': '67890'
            }),

            expected = 'Content-Type: multipart/mixed; boundary="----sinikael-?=_1-test"\r\n' +
                'Date: 12345\r\n' +
                'Message-Id: <67890>\r\n' +
                'MIME-Version: 1.0\r\n' +
                '\r\n' +
                '------sinikael-?=_1-test\r\n' +
                'Content-Type: text/plain\r\n' +
                'Content-Transfer-Encoding: 7bit\r\n' +
                '\r\n' +
                'Hello world!\r\n' +
                '------sinikael-?=_1-test--\r\n';

            mb.createChild('text/plain').setContent('Hello world!');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(msg).to.equal(expected);
                done();
            });
        });

        it('should build root with generated headers', function(done) {
            var mb = new Buildmail('text/plain');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Date:\s/m.test(msg)).to.be.true;
                expect(/^Message\-Id:\s</m.test(msg)).to.be.true;
                expect(/^MIME-Version: 1.0$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should not include bcc missing in output, but in envelope', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                from: 'sender@example.com',
                to: 'receiver@example.com',
                bcc: 'bcc@example.com'
            }),
            envelope = mb.getEnvelope();

            expect(envelope).to.deep.equal({
                from: 'sender@example.com',
                to: ['receiver@example.com', 'bcc@example.com']
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^From: sender@example.com$/m.test(msg)).to.be.true;
                expect(/^To: receiver@example.com$/m.test(msg)).to.be.true;
                expect(!/^Bcc:/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should include bcc missing in output and in envelope', function(done) {
            var mb = new Buildmail('text/plain', {
                keepBcc: true
            }).
            setHeader({
                from: 'sender@example.com',
                to: 'receiver@example.com',
                bcc: 'bcc@example.com'
            }),
            envelope = mb.getEnvelope();

            expect(envelope).to.deep.equal({
                from: 'sender@example.com',
                to: ['receiver@example.com', 'bcc@example.com']
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^From: sender@example.com$/m.test(msg)).to.be.true;
                expect(/^To: receiver@example.com$/m.test(msg)).to.be.true;
                expect(/^Bcc: bcc@example.com$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should use set envelope', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                from: 'sender@example.com',
                to: 'receiver@example.com',
                bcc: 'bcc@example.com'
            }).setEnvelope({
                from: 'a',
                to: 'b'
            }),
            envelope = mb.getEnvelope();

            expect(envelope).to.deep.equal({
                from: 'a',
                to: ['b']
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^From: sender@example.com$/m.test(msg)).to.be.true;
                expect(/^To: receiver@example.com$/m.test(msg)).to.be.true;
                expect(!/^Bcc:/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should have unicode subject', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                subject: 'jõgeval istus kägu metsas'
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Subject: =\?UTF-8\?Q\?j=C3=B5geval\?= istus =\?UTF-8\?Q\?k=C3=A4gu\?= metsas$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should have unicode subject with strange characters', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                subject: 'ˆ¸ÁÌÓıÏˇÁÛ^¸\\ÁıˆÌÁÛØ^\\˜Û˝™ˇıÓ¸^\\˜ﬁ^\\·\\˜Ø^£˜#ﬁ^\\£ﬁ^\\£ﬁ^\\'
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(msg.match(/\bSubject: [^\r]*\r\n( [^\r]*\r\n)*/)[0]).to.equal('Subject: =?UTF-8?Q?=CB=86=C2=B8=C3=81=C3=8C=C3=93=C4=B1?=\r\n =?UTF-8?Q?=C3=8F=CB=87=C3=81=C3=9B^=C2=B8\\=C3=81?=\r\n =?UTF-8?Q?=C4=B1=CB=86=C3=8C=C3=81=C3=9B=C3=98^\\?=\r\n =?UTF-8?Q?=CB=9C=C3=9B=CB=9D=E2=84=A2=CB=87=C4=B1?=\r\n =?UTF-8?Q?=C3=93=C2=B8^\\=CB=9C=EF=AC=81^\\=C2=B7\\?=\r\n =?UTF-8?Q?=CB=9C=C3=98^=C2=A3=CB=9C#=EF=AC=81^\\?=\r\n =?UTF-8?Q?=C2=A3=EF=AC=81^\\=C2=A3=EF=AC=81^\\?=\r\n');
                done();
            });
        });

        it('should keep 7bit text as is', function(done) {
            var mb = new Buildmail('text/plain').
            setContent('tere tere');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/\r\n\r\ntere tere$/.test(msg)).to.be.true;
                expect(/^Content-Type: text\/plain$/m.test(msg)).to.be.true;
                expect(/^Content-Transfer-Encoding: 7bit$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should stuff flowed space', function(done) {
            var mb = new Buildmail('text/plain; format=flowed').
            setContent('tere\r\nFrom\r\n Hello\r\n> abc\r\nabc');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Content-Type: text\/plain; format=flowed$/m.test(msg)).to.be.true;
                expect(/^Content-Transfer-Encoding: 7bit$/m.test(msg)).to.be.true;

                msg = msg.split('\r\n\r\n');
                msg.shift();
                msg = msg.join('\r\n\r\n');

                expect(msg).to.equal('tere\r\n From\r\n  Hello\r\n > abc\r\nabc');
                done();
            });
        });

        it('should fetch ascii filename', function(done) {
            var mb = new Buildmail('text/plain', {
                filename: 'jogeva.txt'
            }).
            setContent('jogeva');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/\r\n\r\njogeva$/.test(msg)).to.be.true;
                expect(/^Content-Type: text\/plain$/m.test(msg)).to.be.true;
                expect(/^Content-Transfer-Encoding: 7bit$/m.test(msg)).to.be.true;
                expect(/^Content-Disposition: attachment; filename=jogeva.txt$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should set unicode filename', function(done) {
            var mb = new Buildmail('text/plain', {
                filename: 'jõgeva.txt'
            }).
            setContent('jõgeva');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Content-Type: text\/plain; charset=utf-8$/m.test(msg)).to.be.true;
                expect(/^Content-Transfer-Encoding: quoted-printable$/m.test(msg)).to.be.true;
                expect(/^Content-Disposition: attachment; filename\*0\*=utf-8''j%C3%B5geva.txt$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should encode filename with a space', function(done) {
            var mb = new Buildmail('text/plain', {
                filename: 'document a.test.pdf'
            }).
            setContent('jõgeva');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Content-Type: text\/plain; charset=utf-8$/m.test(msg)).to.be.true;
                expect(/^Content-Transfer-Encoding: quoted-printable$/m.test(msg)).to.be.true;
                expect(/^Content-Disposition: attachment; filename="document a.test.pdf"$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should detect content type from filename', function(done) {
            var mb = new Buildmail(false, {
                filename: 'jogeva.zip'
            }).
            setContent('jogeva');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Content-Type: application\/zip$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should convert address objects', function(done) {
            var mb = new Buildmail(false).
            setHeader({
                from: [{
                    name: 'the safewithme testuser',
                    address: 'safewithme.testuser@jõgeva.com'
                }],
                cc: [{
                    name: 'the safewithme testuser',
                    address: 'safewithme.testuser@jõgeva.com'
                }]
            });

            expect(mb.getEnvelope()).to.deep.equal({
                from: 'safewithme.testuser@xn--jgeva-dua.com',
                to: [
                    'safewithme.testuser@xn--jgeva-dua.com'
                ]
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^From: the safewithme testuser <safewithme.testuser@xn\-\-jgeva-dua.com>$/m.test(msg)).to.be.true;
                expect(/^Cc: the safewithme testuser <safewithme.testuser@xn\-\-jgeva-dua.com>$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should skip empty header', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                a: 'b',
                cc: '',
                dd: [],
                o: false,
                date: 'zzz',
                'message-id': '67890'
            }).
            setContent('Hello world!'),

            expected = 'Content-Type: text/plain\r\n' +
                'A: b\r\n' +
                'Date: zzz\r\n' +
                'Message-Id: <67890>\r\n' +
                'Content-Transfer-Encoding: 7bit\r\n' +
                'MIME-Version: 1.0\r\n' +
                '\r\n' +
                'Hello world!';

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(msg).to.equal(expected);
                done();
            });
        });

        it('should set default transfer encoding for application content', function(done) {
            var mb = new Buildmail('application/x-my-stuff').
            setHeader({
                date: '12345',
                'message-id': '67890'
            }).
            setContent('Hello world!'),

            expected = 'Content-Type: application/x-my-stuff\r\n' +
                'Date: 12345\r\n' +
                'Message-Id: <67890>\r\n' +
                'Content-Transfer-Encoding: base64\r\n' +
                'MIME-Version: 1.0\r\n' +
                '\r\n' +
                'SGVsbG8gd29ybGQh';

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(msg).to.equal(expected);
                done();
            });
        });

        it('should not set transfer encoding for multipart content', function(done) {
            var mb = new Buildmail('multipart/global').
            setHeader({
                date: '12345',
                'message-id': '67890'
            }).
            setContent('Hello world!'),

            expected = 'Content-Type: multipart/global; boundary=abc\r\n' +
                'Date: 12345\r\n' +
                'Message-Id: <67890>\r\n' +
                'MIME-Version: 1.0\r\n' +
                '\r\n' +
                'Hello world!\r\n' +
                '--abc--' +
                '\r\n';

            mb.boundary = 'abc';

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(msg).to.equal(expected);
                done();
            });
        });

        it('should use from domain for message-id', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                from: 'test@example.com'
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Message-Id: <\d+(\-[a-f0-9]{8}){3}@example\.com>$/m.test(msg)).to.be.true;
                done();
            });
        });

        it('should fallback to localhost for message-id', function(done) {
            var mb = new Buildmail('text/plain');

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^Message-Id: <\d+(\-[a-f0-9]{8}){3}@localhost>$/m.test(msg)).to.be.true;
                done();
            });
        });
    });

    describe('#getEnvelope', function() {
        it('should get envelope', function() {
            expect(new Buildmail().addHeader({
                from: 'From <from@example.com>',
                sender: 'Sender <sender@example.com>',
                to: 'receiver1@example.com'
            }).addHeader({
                to: 'receiver2@example.com',
                cc: 'receiver1@example.com, receiver3@example.com',
                bcc: 'receiver4@example.com, Rec5 <receiver5@example.com>'
            }).getEnvelope()).to.deep.equal({
                from: 'from@example.com',
                to: ['receiver1@example.com', 'receiver2@example.com', 'receiver3@example.com', 'receiver4@example.com', 'receiver5@example.com']
            });

            expect(new Buildmail().addHeader({
                sender: 'Sender <sender@example.com>',
                to: 'receiver1@example.com'
            }).addHeader({
                to: 'receiver2@example.com',
                cc: 'receiver1@example.com, receiver3@example.com',
                bcc: 'receiver4@example.com, Rec5 <receiver5@example.com>'
            }).getEnvelope()).to.deep.equal({
                from: 'sender@example.com',
                to: ['receiver1@example.com', 'receiver2@example.com', 'receiver3@example.com', 'receiver4@example.com', 'receiver5@example.com']
            });
        });
    });

    describe('#getAddresses', function() {
        it('should get address object', function() {
            expect(new Buildmail().addHeader({
                from: 'From <from@example.com>',
                sender: 'Sender <sender@example.com>',
                to: 'receiver1@example.com'
            }).addHeader({
                to: 'receiver2@example.com',
                cc: 'receiver1@example.com, receiver3@example.com',
                bcc: 'receiver4@example.com, Rec5 <receiver5@example.com>'
            }).getAddresses()).to.deep.equal({
                from: [{
                    address: 'from@example.com',
                    name: 'From'
                }],
                sender: [{
                    address: 'sender@example.com',
                    name: 'Sender'
                }],
                to: [{
                    address: 'receiver1@example.com',
                    name: ''
                }, {
                    address: 'receiver2@example.com',
                    name: ''
                }],
                cc: [{
                    address: 'receiver1@example.com',
                    name: ''
                }, {
                    address: 'receiver3@example.com',
                    name: ''
                }],
                bcc: [{
                    address: 'receiver4@example.com',
                    name: ''
                }, {
                    address: 'receiver5@example.com',
                    name: 'Rec5'
                }]
            });

            expect(new Buildmail().addHeader({
                sender: 'Sender <sender@example.com>',
                to: 'receiver1@example.com'
            }).addHeader({
                to: 'receiver2@example.com',
                cc: 'receiver1@example.com, receiver1@example.com',
                bcc: 'receiver4@example.com, Rec5 <receiver5@example.com>'
            }).getAddresses()).to.deep.equal({
                sender: [{
                    address: 'sender@example.com',
                    name: 'Sender'
                }],
                to: [{
                    address: 'receiver1@example.com',
                    name: ''
                }, {
                    address: 'receiver2@example.com',
                    name: ''
                }],
                cc: [{
                    address: 'receiver1@example.com',
                    name: ''
                }],
                bcc: [{
                    address: 'receiver4@example.com',
                    name: ''
                }, {
                    address: 'receiver5@example.com',
                    name: 'Rec5'
                }]
            });
        });
    });

    describe('#_parseAddresses', function() {
        it('should normalize header key', function() {
            var mb = new Buildmail();

            expect(mb._parseAddresses('test address@example.com')).to.deep.equal([{
                address: 'address@example.com',
                name: 'test'
            }]);

            expect(mb._parseAddresses(['test address@example.com'])).to.deep.equal([{
                address: 'address@example.com',
                name: 'test'
            }]);

            expect(mb._parseAddresses([
                ['test address@example.com']
            ])).to.deep.equal([{
                address: 'address@example.com',
                name: 'test'
            }]);

            expect(mb._parseAddresses([{
                address: 'address@example.com',
                name: 'test'
            }])).to.deep.equal([{
                address: 'address@example.com',
                name: 'test'
            }]);
        });
    });

    describe('#_normalizeHeaderKey', function() {
        it('should normalize header key', function() {
            var mb = new Buildmail();

            expect(mb._normalizeHeaderKey('key')).to.equal('Key');
            expect(mb._normalizeHeaderKey('mime-vERSION')).to.equal('MIME-Version');
            expect(mb._normalizeHeaderKey('-a-long-name')).to.equal('-A-Long-Name');
        });
    });

    describe('#_handleContentType', function() {
        it('should do nothing on non multipart', function() {
            var mb = new Buildmail();
            expect(mb.boundary).to.not.exist;
            mb._handleContentType({
                value: 'text/plain'
            });
            expect(mb.boundary).to.be.false;
            expect(mb.multipart).to.be.false;
        });

        it('should use provided boundary', function() {
            var mb = new Buildmail();
            expect(mb.boundary).to.not.exist;
            mb._handleContentType({
                value: 'multipart/mixed',
                params: {
                    boundary: 'abc'
                }
            });
            expect(mb.boundary).to.equal('abc');
            expect(mb.multipart).to.equal('mixed');
        });

        it('should generate boundary', function() {
            var mb = new Buildmail();
            sinon.stub(mb, '_generateBoundary').returns('def');

            expect(mb.boundary).to.not.exist;
            mb._handleContentType({
                value: 'multipart/mixed',
                params: {}
            });
            expect(mb.boundary).to.equal('def');
            expect(mb.multipart).to.equal('mixed');

            mb._generateBoundary.restore();
        });
    });

    describe('#_generateBoundary ', function() {
        it('should genereate boundary string', function() {
            var mb = new Buildmail();
            mb._nodeId = 'abc';
            mb.rootNode.baseBoundary = 'def';
            expect(mb._generateBoundary()).to.equal('----sinikael-?=_abc-def');
        });
    });

    describe('#_encodeHeaderValue', function() {
        it('should do noting if possible', function() {
            var mb = new Buildmail();
            expect(mb._encodeHeaderValue('x-my', 'test value')).to.equal('test value');
        });

        it('should encode non ascii characters', function() {
            var mb = new Buildmail();
            expect(mb._encodeHeaderValue('x-my', 'test jõgeva value')).to.equal('test =?UTF-8?Q?j=C3=B5geva?= value');
        });

        it('should format references', function() {
            var mb = new Buildmail();
            expect(mb._encodeHeaderValue('references', 'abc def')).to.equal('<abc> <def>');
            expect(mb._encodeHeaderValue('references', ['abc', 'def'])).to.equal('<abc> <def>');
        });

        it('should format message-id', function() {
            var mb = new Buildmail();
            expect(mb._encodeHeaderValue('message-id', 'abc')).to.equal('<abc>');
        });

        it('should format addresses', function() {
            var mb = new Buildmail();
            expect(mb._encodeHeaderValue('from', {
                name: 'the safewithme testuser',
                address: 'safewithme.testuser@jõgeva.com'
            })).to.equal('the safewithme testuser <safewithme.testuser@xn--jgeva-dua.com>');
        });
    });

    describe('#_convertAddresses', function() {
        it('should convert address object to a string', function() {
            var mb = new Buildmail();
            expect(mb._convertAddresses([{
                name: 'Jõgeva Ants',
                address: 'ants@jõgeva.ee'
            }, {
                name: 'Composers',
                group: [{
                    address: 'sebu@example.com',
                    name: 'Bach, Sebastian'
                }, {
                    address: 'mozart@example.com',
                    name: 'Mozzie'
                }]
            }])).to.equal('=?UTF-8?Q?J=C3=B5geva_Ants?= <ants@xn--jgeva-dua.ee>, Composers:"Bach, Sebastian" <sebu@example.com>, Mozzie <mozart@example.com>;');
        });

        it('should keep ascii name as is', function() {
            var mb = new Buildmail();
            expect(mb._convertAddresses([{
                name: 'O\'Vigala Sass',
                address: 'a@b.c'
            }])).to.equal('O\'Vigala Sass <a@b.c>');
        });

        it('should include name in quotes for special symbols', function() {
            var mb = new Buildmail();
            expect(mb._convertAddresses([{
                name: 'Sass, Vigala',
                address: 'a@b.c'
            }])).to.equal('"Sass, Vigala" <a@b.c>');
        });

        it('should escape quotes', function() {
            var mb = new Buildmail();
            expect(mb._convertAddresses([{
                name: '"Vigala Sass"',
                address: 'a@b.c'
            }])).to.equal('"\\"Vigala Sass\\"" <a@b.c>');
        });

        it('should mime encode unicode names', function() {
            var mb = new Buildmail();
            expect(mb._convertAddresses([{
                name: '"Jõgeva Sass"',
                address: 'a@b.c'
            }])).to.equal('=?UTF-8?Q?=22J=C3=B5geva_Sass=22?= <a@b.c>');
        });
    });

    describe('HTTP streaming', function() {
        var port = 10337;
        var server;

        beforeEach(function(done) {
            server = http.createServer(function(req, res) {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                var data = new Buffer(new Array(1024 + 1).join('ä'), 'utf-8');
                var i = 0;
                var sendByte = function() {
                    if (i >= data.length) {
                        return res.end();
                    }
                    res.write(new Buffer([data[i++]]));
                    setImmediate(sendByte);
                };

                sendByte();
            });

            server.listen(port, done);
        });

        afterEach(function(done) {
            server.close(done);
        });

        it('should pipe URL as an attachment', function(done) {
            var mb = new Buildmail('text/plain').
            setContent({
                href: 'http://localhost:' + port
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/^=C3=A4/m.test(msg)).to.be.true;
                done();
            });
        });

        it('#should not throw on error', function(done) {
            var mb = new Buildmail('text/plain').
            setContent({
                href: 'http://__should_not_exist:88888'
            });

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(/ENOTFOUND/.test(msg)).to.be.true;
                done();
            });
        });
    });

    describe('#transform', function() {
        it('should pipe through provided stream', function(done) {
            var mb = new Buildmail('text/plain').
            setHeader({
                date: '12345',
                'message-id': '67890'
            }).
            setContent('Hello world!');

            var expected = 'Content-Type:\ttext/plain\r\n' +
                'Date:\t12345\r\n' +
                'Message-Id:\t<67890>\r\n' +
                'Content-Transfer-Encoding:\t7bit\r\n' +
                'MIME-Version:\t1.0\r\n' +
                '\r\n' +
                'Hello\tworld!';

            // Transform stream that replaces all spaces with tabs
            var transform = new Transform();
            transform._transform = function(chunk, encoding, done) {
                if (encoding !== 'buffer') {
                    chunk = new Buffer(chunk, encoding);
                }
                for (var i = 0, len = chunk.length; i < len; i++) {
                    if (chunk[i] === 0x20) {
                        chunk[i] = 0x09;
                    }
                }
                this.push(chunk);
                done();
            };

            mb.transform(transform);

            mb.build(function(err, msg) {
                msg = msg.toString();
                expect(msg).to.equal(expected);
                done();
            });
        });
    });
});