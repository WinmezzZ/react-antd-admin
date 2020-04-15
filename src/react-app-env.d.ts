/// <reference types="react-scripts" />

declare module 'react-router' {
  import * as React from 'react'
  import * as History from 'history'

  export interface RouteConfigObject {
    path?: string
    element?: React.ReactElement
    children?: RouteConfigObject[]
  }

  export interface MemoryRouterProps {
    initialEntries?: string[]
    initialIndex?: number
    timeout?: number
  }

  export class MemoryRouter extends React.Component<MemoryRouterProps, any> {}

  export interface NavigateProps extends NavigateOptions {
    to: History.LocationDescriptor
  }

  export class Navigate extends React.Component<NavigateProps, any> {}

  export class Outlet extends React.Component<{}, any> {}

  export interface RouteProps {
    path?: string
    element?: React.ReactElement
  }

  export class Route extends React.Component<RouteProps, any> {}

  export interface RouterProps {
    history?: History
    timeout?: number
  }

  export class Router extends React.Component<RouterProps, any> {}

  export interface RoutesProps {
    basename?: string
    caseSensitive?: boolean
  }

  export class Routes extends React.Component<RoutesProps, any> {}

  export function createRoutesFromChildren(children: React.ReactNode): RouteConfigObject[]

  export function useBlocker(blocker: any, when?: boolean): void

  export function useHref(to: History.LocationDescriptor): History.Href

  export function useLocation(): History.Location

  export function useMatch(to: History.Location): boolean

  export interface NavigateOptions {
    replace?: boolean
    state?: any
  }

  declare function navigate(delta: number): void
  declare function navigate(to: History.LocationDescriptor, options?: NavigateOptions): void

  export function useNavigate(): typeof navigate

  export function useOutlet(): React.ReactElement

  export function useParams(): object

  export function useResolvedLocation(to: History.LocationDescriptor): History.Location

  export function useRoutes(
    routes: RouteConfigObject[],
    basename?: string,
    caseSensitive?: boolean
  ): React.ReactElement | null

  export function matchRoutes(
    routes: RouteConfigObject[],
    location: History.LocationDescriptor,
    basename?: string,
    caseSensitive?: boolean
  ): History.Location | null

  export function resolveLocation(to: History.LocationDescriptor, fromPathname?: string): History.Location

  export function generatePath(pathname: string, params?: object): string
}

declare module 'react-router-dom' {
  import * as React from 'react'
  import * as History from 'history'

  export {
    // interfaces
    RouteConfigObject,
    MemoryRouterProps,
    NavigateProps,
    RouteProps,
    RouterProps,
    RoutesProps,
    // components
    MemoryRouter,
    Navigate,
    Outlet,
    Route,
    Router,
    Routes,
    // hooks
    useBlocker,
    useHref,
    useLocation,
    useMatch,
    useNavigate,
    useOutlet,
    useParams,
    useResolvedLocation,
    useRoutes,
    // utils
    createRoutesFromChildren,
    matchRoutes,
    resolveLocation,
    generatePath
  } from 'react-router'

  export interface BrowserRouterProps {
    timeout?: number
    window?: Window
  }

  export class BrowserRouter extends React.Component<BrowserRouterProps, any> {}

  export interface HashRouterProps {
    timeout?: number
    window?: Window
  }

  export class HashRouter extends React.Component<HashRouterProps, any> {}

  export interface LinkProps {
    as?: React.ElementType
    onClick?(event: React.SyntheticEvent): void
    replace?: boolean
    state?: object
    target?: string
    to: History.LocationDescriptor
  }

  export class Link extends React.Component<LinkProps, any> {}

  export interface NavLinkProps extends LinkProps {
    'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true'
    activeClassName?: string
    activeStyle?: object
    className?: string
    style?: object
    to: History.LocationDescriptor
  }

  export class NavLink extends React.Component<NavLinkProps, any> {}

  export interface PromptProps {
    message?: string
    when?: boolean
  }

  export class Prompt extends React.Component<PromptProps, any> {}

  export function usePrompt(message: string, when?: boolean): void

  export function useSearchParams(): URLSearchParams
}

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  less: {
    modifyVars: (arg: any) => Promise<any>
  }
}
