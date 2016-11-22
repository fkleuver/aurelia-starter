import { FrameworkConfiguration, LogManager } from "aurelia-framework"
import { AiAdapter } from "./ai-adapter";
import { AiLogAppender } from "./ai-log-appender";

export function configure(frameworkConfig: FrameworkConfiguration, env) {
    if (env.appinsights) {
        LogManager.addAppender(new AiLogAppender());
        frameworkConfig.container.autoRegister(AiAdapter);
    }
}