// based on https://github.com/TypeStrong/typedoc/blob/1ab233b1cfc2e772648d3bfffed194e4773fa86d/src/lib/output/themes/default/partials/header.tsx
import {
  DeclarationReflection,
  DefaultThemeRenderContext,
  JSX,
  PageEvent,
  Reflection,
  ReflectionKind,
} from 'typedoc';
import {
  hasTypeParameters,
  join,
  renderFlags,
} from '../node_modules/typedoc/dist/lib/output/themes/lib';
import { Options } from '../node_modules/typedoc/dist/lib/utils';

export default (context: DefaultThemeRenderContext, _options: Options) => {
  return (props: PageEvent<Reflection>) => {
    return header(context, props);
  };
};

export function header(context: DefaultThemeRenderContext, props: PageEvent<Reflection>) {
  const HeadingLevel = props.model.isProject() ? 'h2' : 'h1';
  const kindString =
    props.model.kind === ReflectionKind.Module ? 'Package' : props.model.kindString;
  return (
    <div class="tsd-page-title">
      {!!props.model.parent && <ul class="tsd-breadcrumb">{context.breadcrumb(props.model)}</ul>}
      <HeadingLevel>
        {props.model.kind !== ReflectionKind.Project && `${kindString ?? ''} `}
        {props.model.name}
        {/* {props.model instanceof DeclarationReflection &&
          props.model.version !== undefined &&
          ` - v${props.model.version}`} */}
        {hasTypeParameters(props.model) && (
          <>
            {'<'}
            {join(', ', props.model.typeParameters, item => item.name)}
            {'>'}
          </>
        )}
        {/* {renderFlags(props.model.flags, props.model.comment)} */}
      </HeadingLevel>
    </div>
  );
}
