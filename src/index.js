import Rx from 'rxjs';

function AgentGuide(socket) {
    this.sock = socket;
}

AgentGuide.prototype.resolveIncMessage = function (dataObj) {
    //assuming dataObj.evType
    console.log('AG obj received inc message: ' + dataObj.evType);
  //  const evType = dataObj.evType;
//    this.emitter.send(evType, dataObj);
}

AgentGuide.prototype.getStream = function (streamQuery = []) {
    const evStreamsArr = streamQuery.map((queryStr) =>
        Rx.Observable.create(((thisAg, expectedType) => (observer) => {
            thisAg.sock.on('message', ((obs, expectedType) => (sockMess) => {
                let jsonObj = (typeof sockMess === 'object') ? sockMess : JSON.parse(sockMess);
                if (jsonObj.evType === expectedType) obs.onNext(jsonObj);
            })(observer, expectedType));

            //return unsub() { ... }

        })(this, queryStr)));
    return Rx.Observable.merge.apply(undefined, evStreamsArr);
}

AgentGuide.prototype.sendMessage = function (mess) {
    this.sock.send(typeof mess === 'object' ?
        JSON.stringify(mess) : mess);
}

export default AgentGuide;