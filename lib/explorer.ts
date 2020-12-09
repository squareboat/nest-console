import { Injectable } from "@nestjs/common";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { COMMAND_NAME, COMMAND_OPTIONS } from "./constants";
import { CommandMeta } from "./metadata";

@Injectable()
export class ConsoleExplorer {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner
  ) {}

  onModuleInit() {
    const wrappers = this.discovery.getProviders();
    wrappers.forEach((w) => {
      const { instance } = w;
      if (
        !instance ||
        typeof instance === "string" ||
        !Object.getPrototypeOf(instance)
      ) {
        return;
      }

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key: string) => this.lookupConsoleCommands(instance, key)
      );
    });
  }

  lookupConsoleCommands(instance: Record<string, Function>, key: string) {
    const methodRef = instance[key];
    const hasCommandMeta = Reflect.hasMetadata(COMMAND_NAME, instance, key);
    const isClassConsoleCommand = Reflect.hasMetadata(
      COMMAND_NAME,
      instance.constructor
    );

    if (!hasCommandMeta && !isClassConsoleCommand) return;

    if (isClassConsoleCommand && key != "handle") return;

    const command =
      Reflect.getMetadata(COMMAND_NAME, instance, key) ||
      Reflect.getMetadata(COMMAND_NAME, instance.constructor);

    const options =
      Reflect.getMetadata(COMMAND_OPTIONS, instance, key) ||
      Reflect.getMetadata(COMMAND_OPTIONS, instance.constructor);

    CommandMeta.setCommand(command, methodRef.bind(instance), options || {});
  }
}
