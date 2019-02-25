import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Image, Header, Table, Button} from 'semantic-ui-react';
import './MovieComponent.css';

import MovieInfoComponent from './movieInfoComponent';


class MovieComponent extends Component {
    
    state = {
        movie: [],
        search: ""
    }

    componentDidMount(){
        const imdbId = window.location.href.split("/").pop()
        const search = window.location.href.split("/")[4]
        fetch("/movie/"+imdbId)
            .then( response => {
                if(response.ok){
                    return response.json()
                }else{
                    alert("no results found! Only movie can be detailed in this page")
                    this.props.history.push("/search/"+search)
                }
            })  
            .then( result =>
                this.setState({
                    movie: result,
                    search
                })
            )
    }
    
    
    render(){

        const {posterImg, title, trailUrl} = this.state.movie;
        const properties = ['director', 'genres', 'publishDate','rating', 'runTime', 'stars', 'storyLine', 'summaryText','writer'];
        const movieInfoList = properties.map( (property, index) => {
            return <MovieInfoComponent key={"movieProperty_"+index} propertyName={property} propertyValue={this.state.movie[property]} />
        })

        return (
            <Container className='movieWrapper'>
                <Button color="blue" style={{textAlign:'left'}}><Link to={"/search/"+ this.state.search} style={{color:"white"}}>Back to Search</Link></Button>
            
                <Header as="h1">{title}</Header>
                <Image src={posterImg} className="poster"/>
               
                <Table basic='very' celled collapsing>

                    <Table.Body style={{color: 'white'}}>
                        {movieInfoList}
                    </Table.Body>
                </Table>

                
            </Container>

        );
    }
}

export default MovieComponent;