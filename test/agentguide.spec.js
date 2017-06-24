/* global describe, it, before */

import chai from 'chai';
import chaiRx from 'chai-rx';
import Rx from 'rx';
import AgentGuide from '../lib/agent-guide-wrapper.js';
import events from 'events';

chai.use(chaiRx);

chai.expect();

const expect = chai.expect;
const { onNext, onCompleted } = Rx.ReactiveTest;

let ag,
  testEmitter,
  emitterTestData,
  testOneStream;


describe('Should be able to utilize getStream',  () => {
  before(() => {
    testEmitter = new events.EventEmitter();
    ag = new AgentGuide(testEmitter);
    emitterTestData = [
        { evType: 'test1', mess: 'mess1' },
        { evType: 'test2', mess: 'mess2' },
        { evType: 'test3', mess: 'mess3' },
        { evType: 'test2', mess: 'mess4' },
        { evType: 'test3', mess: 'mess5' },
    ];
    testOneStream = ag.getStream(['test1']);
  });
  describe('when I need the name', () => {
    it('should return the one object', () => {
        testOneStream.subscribe((messageObject) => {
            expect(messageObject).should
                .deep.equal({ evType: 'test1', mess: 'mess1' });
        });
    });
  });
});
