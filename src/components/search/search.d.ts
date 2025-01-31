import { Component, ReactNode } from 'react';
import { Film } from '../../types/filmTypes';
interface State {
    queryString: string;
    result: Film[];
}
declare class Search extends Component<object, State> {
    constructor(props: object);
    requestAPI: () => void;
    checkData: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): ReactNode;
}
export default Search;
