import Command from "./command";
import MA, { MA_HOOK } from './ma';
import { toArray } from './util';

export default class MQ {
  constructor() {
    this.cmdQueue = [];
  }
  run(...args) {
    let cmds = this.toCommands(...args);
    let tmpCmds = this.cmdQueue.concat(cmds);

    this.cmdQueue = [];

    for (; 0 < tmpCmds.length && !this.runCommand(tmpCmds[0]) && !(tmpCmds.shift(), 0 < this.cmdQueue.length););

    this.cmdQueue = this.cmdQueue.concat(tmpCmds);
  }
  toCommands(...args) {
    let cmds = [];
    for (let i = 0; i < args.length; i++) {
      try {
        // 这里的 args[i] 是 arguments 对象
        let cmd = new Command(toArray(args[i]));
        cmds.push(cmd);
      } catch (e) { }
    }

    return cmds;
  }
  runCommand(cmd) {
    try {
      if (cmd.readyCallback) {
        cmd.readyCallback.apply(null, MA.getAll());
      } else {
        let tracker = cmd.trackerName == MA_HOOK ? MA : MA.getByName(cmd.trackerName);

        if (cmd.isCreateCommand) {
          't0' == cmd.trackerName && MA.create.apply(MA, cmd.fields);
        } else if (tracker) {
          tracker[cmd.methodName].apply(tracker, cmd.fields);
        }
      }
    } catch (e) { }
  }
}
