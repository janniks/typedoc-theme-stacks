// based on https://github.com/Gerrit0/typedoc-custom-theme-demo/blob/951adb8aa9914ea09d53919cea77e90a5ff91806/src/index.tsx
import { Application, DefaultTheme, DefaultThemeRenderContext, JSX, Options } from 'typedoc';

import makeHeader from './header';
import makeNavigation from './navigation';

export class StacksThemeContext extends DefaultThemeRenderContext {
  constructor(theme: DefaultTheme, options: Options) {
    super(theme, options);

    this.header = makeHeader(this, options);
    this.navigation = makeNavigation(this, options);
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
  app.renderer.hooks.on('head.end', () => (
    <style>
      {`
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
        }
        pre {
          border: initial !important;
          border-radius: 8px !important;
        }
        code {
          border-radius: 3px !important;
        }
        .tsd-typography h1 {
          display: none;
        }
        .tsd-typography p {
          margin: 0.5em 0;
        }
        .tsd-typography blockquote {
          color: var(--color-text-aside);
        }
        .tsd-navigation.primary a {
          padding: 0.4375rem 0.5rem;
        }
        .tsd-theme-toggle {
          padding-bottom: 12px;
        }
        .tsd-kind-module {
          position: relative;
        }
        .tsd-navigation.primary * {
          border-left: none !important;
        }
        span.module-dot {
          top: 12.25px;
          position: absolute;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 6px;
          background-color: var(--color-accent);
        }
        .current span.module-dot {
          background-color: var(--color-link);
        }
        .tsd-navigation.primary ul li a:hover span.module-dot, .tsd-navigation.primary li.selected a span.module-dot {
          border: 4px solid #9494ff;
        }
        .menu-sticky-wrap {
          position: initial;
          overflow: initial;
        }
        .container-main {
          display: grid;
          grid-template-columns: 3fr 1fr;
        }
        .container.container-main * {
          min-width: 0px;
        }
        .col-4, .col-8 {
          min-width: 100%;
          max-width: 100%;
        }

        .tsd-typography a {
          text-decoration: underline;
          font-weight:500;
        }
        .tsd-typography strong {
          font-weight:600;
        }
        .tsd-typography ol > li {
          position: relative;
          padding-left:1.75em;
        }
        .tsd-typography ol > li:before {
          position: absolute;
          font-weight: 400;
          left:0;
        }
        .tsd-typography ul > li {
          position: relative;
          padding-left:1.75em;
        }
        .tsd-typography ul > li:before {
          content: "";
          position: absolute;
          border-radius: 50%;
          width: .375em;
          height: .375em;
          top: calc(.875em - .1875em);
          left:.25em;
        }
        .tsd-typography hr {
          border-top-width: 1px;
          margin-top: 3em;
          margin-bottom: 3em;
        }
        .tsd-typography blockquote {
          font-weight: 500;
          font-style: italic;
          border-left-width: .25rem;
          margin-top: 1.6em;
          margin-bottom: 1.6em;
          padding-left:1em;
        }
        .tsd-typography h1 {
          font-weight: 800;
          font-size: 2.25em;
          margin-top: 0;
          margin-bottom: .8888889em;
          line-height:1.1111111;
        }
        .tsd-typography h2 {
          font-weight: 700;
          font-size: 1.5em;
          margin-top: 2em;
          margin-bottom: 1em;
          line-height:1.3333333;
        }
        .tsd-typography h3 {
          font-size: 1.25em;
          margin-top: 1.6em;
          margin-bottom: .6em;
          line-height:1.6;
        }
        .tsd-typography h3,.tsd-typography h4 {
          font-weight:600;
        }
        .tsd-typography h4 {
          margin-top: 1.5em;
          margin-bottom: .5em;
          line-height:1.5;
        }
        .tsd-typography figure figcaption {
          font-size: .875em;
          line-height: 1.4285714;
          margin-top:.8571429em;
        }
        .tsd-typography code {
          font-weight: 600;
          font-size:.875em;
        }
        .tsd-typography pre {
          overflow-x: auto;
          font-size: .875em;
          line-height: 1.7142857;
          margin-top: 1.7142857em;
          margin-bottom: 1.7142857em;
          border-radius: .375rem;
          padding:.8571429em 1.1428571em;
          white-space: pre;
          scrollbar-width: none;
        }
        .tsd-typography pre::-webkit-scrollbar {
          display: none;
        }
        .tsd-typography pre code {
          border-width: 0;
          border-radius: 0;
          padding: 0;
          font-weight: 400;
          font-size: inherit;
          font-family: inherit;
          line-height:inherit;
        }
        .tsd-typography pre code:after,.tsd-typography pre code:before {
          content:none;
        }
        .tsd-typography table {
          width: 100%;
          table-layout: auto;
          text-align: left;
          margin-top: 2em;
          margin-bottom: 2em;
          font-size: .875em;
          line-height:1.7142857;
        }
        .tsd-typography thead {
          font-weight: 600;
          border-bottom-width: 1px;
        }
        .tsd-typography thead th {
          vertical-align: bottom;
          padding-right: .5714286em;
          padding-bottom: .5714286em;
          padding-left:.5714286em;
        }
        .tsd-typography tbody tr {
          border-bottom-width: 1px;
        }
        .tsd-typography tbody tr:last-child {
          border-bottom-width:0;
        }
        .tsd-typography tbody td {
          vertical-align: top;
          padding:.5714286em;
        }
        .tsd-typography {
          font-size: 1rem;
          line-height:1.5;
        }
        .tsd-typography p {
          margin-top: 1.25em;
          margin-bottom:1.25em;
        }
        .tsd-typography figure,.tsd-typography img,.tsd-typography video {
          margin-top: 2em;
          margin-bottom:2em;
        }
        .tsd-typography figure > * {
          margin-top: 0;
          margin-bottom:0;
        }
        .tsd-typography h2 code {
          font-size:.875em;
        }
        .tsd-typography h3 code {
          font-size:.9em;
        }
        .tsd-typography thead th:first-child {
          padding-left:0;
        }
        .tsd-typography thead th:last-child {
          padding-right:0;
        }
        .tsd-typography tbody td:first-child {
          padding-left:0;
        }
        .tsd-typography tbody td:last-child {
          padding-right:0;
        }
        .tsd-typography > :first-child {
          margin-top:0;
        }
        .tsd-typography > :last-child {
          margin-bottom:0;
        }
        .tsd-typography address {
          font-style:inherit;
        }
        .tsd-typography a {
          font-weight:inherit;
        }
        .tsd-typography blockquote {
          quotes:none;
        }
      `}
    </style>
  ));
  app.renderer.defineTheme('stacks', StacksTheme);
}
