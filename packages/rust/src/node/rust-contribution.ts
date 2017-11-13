/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify";
import { BaseLanguageServerContribution, IConnection } from "@theia/languages/lib/node";
import { RUST_LANGUAGE_ID, RUST_LANGUAGE_NAME } from '../common';

@injectable()
export class RustContribution extends BaseLanguageServerContribution {

    readonly id = RUST_LANGUAGE_ID;
    readonly name = RUST_LANGUAGE_NAME;

    start(clientConnection: IConnection): void {
        // TODO: rls has to be on PATH, this should be a preference.
        const command = 'rls';
        const args: string[] = [];
        const serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    }

    protected onDidFailSpawnProcess(error: Error): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting `rls`, the Rust language server.");
        console.error("Please make sure it is installed on your system.");
        // TODO: update this link when RLS graudates
        console.error("Follow the instructions here: https://github.com/rust-lang-nursery/rls");
    }
}
