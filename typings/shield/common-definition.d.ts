
/**
 * Function interface: no parameter, no return values
 */
export interface FuncNoParaNoReturn {
    (): void;
}

export interface IFuncOneParam<R, P> {
    (para1: P): R;
}

export interface IFuncTwoParam<R, P1, P2> {
    (para1: P1, para2: P2): R;
}

export interface IFuncStringParaNoReturn {
    (para1: string): void;
}
/**
 * Parameters interface
 */
export interface HubItemsMetadata {
    title: string;
    subTitle?: string;
    description?: string;
    lab: string;
}

export interface LiveMetadata {
    title?: string;
    subTitle?: string,
    description?: string;
    selectedLab?: string;
}

export interface EpisodeMetadata {
    episodeTitle?: string;
    seriesTitle?: string;
    description?: string;
    firstAirDate?: string;
    rating?: string;
    lab: string; // may include firstAirDate , rating
}

export interface MovieMetadata {
    title?: string;
    description?: string;
    releaseYear?: string;
    rating?: string;
    lab: string; // may include releaseYear , rating
}

export interface TabParams {
    foundLabel?: boolean;
    tabType?: string;
    fromInternalList?: boolean;
}