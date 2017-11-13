/*
 * Copyright (C) 2017 Ericsson and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule } from "inversify";

import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { RustClientContribution } from "./rust-client-contribution";
import { RUST_LANGUAGE_ID, RUST_LANGUAGE_NAME } from "./../common";

import { rustMonarchConfig, rustMonarchTokens } from './rust-monaco-language';

export default new ContainerModule(bind => {
    monaco.languages.register({
        id: RUST_LANGUAGE_ID,
        aliases: [RUST_LANGUAGE_NAME, RUST_LANGUAGE_ID],
        extensions: ['.rs'],
        mimetypes: ['text/rust'],
    });

    monaco.languages.onLanguage(RUST_LANGUAGE_ID, () => {
        monaco.languages.setLanguageConfiguration(RUST_LANGUAGE_ID, rustMonarchConfig);
        monaco.languages.setMonarchTokensProvider(RUST_LANGUAGE_ID, rustMonarchTokens);
    });

    bind(RustClientContribution).toSelf().inSingletonScope();
    bind(LanguageClientContribution).toDynamicValue(ctx => ctx.container.get(RustClientContribution));
});
