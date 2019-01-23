import { isFunction } from "./util";

const commandR = /^(?:(\w+)\.)?(\w+)$/;
// ma(readyCallback)
// ma(command, [...fields])
// ma('create', [...args]); ma('[trackerName.]send', [...args]); ma('[trackerName.]set', [...args])
export default class Command {
  constructor([command, ...fields]) {
    if (isFunction(command)) {
      this.readyCallback = command;
    } else {
      let matched = commandR.exec(command);
      // ma('trackerName.send', [...args])
      if (matched && matched.length === 3) {
        this.trackerName = matched[1] || 't0';
        this.methodName = matched[2] || '';
        this.fields = fields;
      }
    }

    this.isCreateCommand = 'create' == this.methodName;
    this.isRemoveCommand = 'remove' == this.methodName;
  }
}
