import { DynamicModule, Global, Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { ListCommands } from "./commands";
import { ConsoleExplorer } from "./explorer";

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [ConsoleExplorer, ListCommands],
})
export class ConsoleModule {
  /**
   * Register options
   * @param options
   */
  static register(): DynamicModule {
    return {
      global: true,
      module: ConsoleModule,
      imports: [DiscoveryModule],
      providers: [ListCommands, ConsoleExplorer],
    };
  }

  /**
   * Register Async Options
   */
  static registerAsync(): DynamicModule {
    return {
      global: true,
      module: ConsoleModule,
      imports: [DiscoveryModule],
      providers: [ConsoleExplorer, ListCommands],
    };
  }
}
