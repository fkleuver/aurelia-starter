import * as projectJson from "./aurelia.json";

interface AureliaProject {
  name: string;
  type: string;
  bundler: Reference;
  build: BuildDefinition;
  platform: BuildTarget;
  transpiler: Transpiler;
  markupProcessor: BuildPackage;
  cssProcessor: BuildPackage;
  editor: Reference;
  unitTestRunner: BuildPackage;
  paths: CommonPaths;
  testFramework: Reference;
}

interface Reference {
  id: string;
  displayName: string;
}

interface BuildPackage extends Reference {
  source: string | string[] | Source;
  fileExtension?: string | string[];
}

interface Source {
  include?: string[];
  exclude?: string[];
}

interface Transpiler extends BuildPackage {
  dtsSource: string | string[] | Source;
}

interface BuildTarget extends BuildPackage {
  index: string;
  baseDir: string;
  output: string;
  baseUrl?: string;
}

interface PathMap {
  [name: string]: string;
}

interface CommonPaths extends PathMap {
  root: string;
  resources: string;
  elements: string;
  attributes: string;
  valueConverters: string;
  bindingBehaviors: string;
}

interface BuildDefinition {
  targets: BuildTarget[];
  options: BuildOptions;
  bundles: Bundle[];
  copyFiles?: PathMap;
  loader: Loader;
}

interface BuildOptions {
  minify: string | MinificationOptions;
  sourcemaps: string;
  rev?: boolean | string;
}

interface MinificationOptions {
  dev?: boolean | MinificationEnvironmentOptions;
  default?: boolean | MinificationEnvironmentOptions;
  "stage & prod"?: boolean | MinificationEnvironmentOptions;
  [name: string]: boolean | MinificationEnvironmentOptions;
}

interface MinificationEnvironmentOptions {
  indent_level?: number;
  "max-line-len"?: number;
}

interface Bundle {
  name: string;
  source?: string[] | Source;
  prepend?: string[] | Source;
  dependencies?: (Dependency | string)[];
}

interface Dependency {
  name: string;
  path: string;
  main?: string;
  packageRoot?: string;
  env?: string;
  exports?: string;
  deps?: string[];
  resources?: string[];
}

interface Loader {
  type: string;
  configTarget: string;
  includeBundleMetadataInConfig: string;
  config?: LoaderConfig;
  plugins?: LoaderPlugin[];
}

interface LoaderConfig {
  waitSeconds?: number;
  [name: string]: any;
}

interface LoaderPlugin {
  name: string;
  extensions: string[];
  stub: boolean;
}

export const project = projectJson as AureliaProject;
