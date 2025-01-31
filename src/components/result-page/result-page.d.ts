import { Component, ReactNode } from 'react';
import { Film } from '../../types/filmTypes';
interface FilmListProps {
    films: Film[];
}
export default class ResultPage extends Component<FilmListProps> {
    render(): ReactNode;
}
export {};
