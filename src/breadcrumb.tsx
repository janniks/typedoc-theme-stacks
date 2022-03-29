import { DefaultThemeRenderContext, JSX, Options, Reflection } from 'typedoc';
import { PACKAGE_PREFIX } from './navigation';

export default (context: DefaultThemeRenderContext, options: Options) => {
  return (props: Reflection) => {
    const prefix = options.getValue(PACKAGE_PREFIX);

    const isTopLevel = props.url == 'modules.html';
    const isPackage = props.url && /modules\/[\w-]*.html/.test(props.url);

    // if (isPackage) return <> </>;

    return props.parent ? (
      <>
        {context.breadcrumb(props.parent)}
        <li>
          {props.url ? (
            <a href={context.urlTo(props)}>{prefix && isTopLevel ? prefix : props.name}</a>
          ) : (
            <span>{props.name}</span>
          )}
        </li>
      </>
    ) : props.url ? (
      <li>
        <a href={context.urlTo(props)}>{prefix && isTopLevel ? prefix : props.name}</a>
      </li>
    ) : undefined;
  };
};
