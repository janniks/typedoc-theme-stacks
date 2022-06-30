// based on https://github.com/Gerrit0/typedoc-custom-theme-demo/blob/951adb8aa9914ea09d53919cea77e90a5ff91806/src/index.tsx
import {
  Application,
  DefaultTheme,
  DefaultThemeRenderContext,
  JSX,
  Options,
  ParameterType,
} from 'typedoc';

import makeHeader, { PROJECT_ROOT_TITLE, VERSION_DECLARATION } from './header';
import makeNavigation, { PACKAGE_PREFIX } from './navigation';
import makeBreadcrumb from './breadcrumb';

export class StacksThemeContext extends DefaultThemeRenderContext {
  constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    this.header = makeHeader(this, options);
    this.navigation = makeNavigation(this, options);
    this.breadcrumb = makeBreadcrumb(this, options);
  }
}

export class StacksTheme extends DefaultTheme {
  private _contextCache?: StacksThemeContext;

  override getRenderContext(): StacksThemeContext {
    this._contextCache ||= new StacksThemeContext(this, this.application.options);
    return this._contextCache;
  }
}

export function load(app: Application) {
  app.options.addDeclaration({
    name: VERSION_DECLARATION,
    type: ParameterType.String,
    defaultValue: '',
    help: 'The version tag of the rendered docs',
  });
  app.options.addDeclaration({
    name: PACKAGE_PREFIX,
    type: ParameterType.String,
    defaultValue: '',
    help: 'The @ package prefix used for all packages in a monorepo',
  });
  app.options.addDeclaration({
    name: PROJECT_ROOT_TITLE,
    type: ParameterType.String,
    defaultValue: 'Library Reference',
    help: 'The title used for the project root',
  });
  app.renderer.hooks.on('head.end', () => (
    <style>
      {`
        .tsd-navigation.primary ul li a.tsd-kind-icon {
          padding-left: 25px;
        }
        .tsd-breadcrumb li:last-child:after {
          content: none;
        }
        span.title-version {
          background: #f2dfff;
          border: 1px solid #9700ff;
          border-radius: 3px;
          font-size: 12px;
          font-weight: normal;
          padding: 1px 4px;
          margin-left: 3px;
        }
        #tsd-search.has-focus span.title-version {
          opacity: 0;
          z-index: 0;
        }
        dl.tsd-comment-tags dd {
          margin: 3px 0 10px 0;
        }
        dl.tsd-comment-tags pre {
          border-radius: 5px;
          margin-bottom: 4px;
        }
        @media (prefers-color-scheme: dark) {
          span.title-version {
            background: #4d0082;
          }
          .light span.title-version {
            background: #f2dfff;
          }
        }
        .dark span.title-version {
          background: #4d0082;
        }
      `}
    </style>
  ));
  app.renderer.defineTheme('stacks', StacksTheme);
}
