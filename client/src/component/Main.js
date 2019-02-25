import React, {Component} from 'react';
import {Form, Button, Container, Header} from 'semantic-ui-react';
import ListComponent from './ListComponent';

class MainLayout extends Component{
    state = {
        search: "",
        results:"",
        isSumbitted: false
    }

    componentDidMount () {
        const url = window.location.href;

        if (url.match(/search\/(.*)/)){
            const item = url.split("/").pop()
            this.setState({
                search: item
            })


            fetch("/search/" + item)
            .then(res => res.json())
            .then(results => {
                this.setState({
                    results: results,
                    isSumbitted: true
                })
            })
        }

    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const movieTitle = this.state.search
        
        fetch("/search/" + movieTitle)
            .then(res => res.json())
            .then(results => {
                this.setState({
                    results: results,
                    isSumbitted: true
                })
            })
        }
    
    render() {
        let resultList;
        if(this.state.isSumbitted){
            resultList = this.state.results.map( (info,index) => {
            return <ListComponent key={'movie_'+index} info={info} search={this.state.search} />
            })
        }
        
        return (
        <Container className="form-group">
            <Header as="h1">Hello, Search a movie</Header>
            <Header as="h4">all the information is scrapped from <a href="https://www.imdb.com">IMDB site</a></Header>
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <label htmlFor="search">Search</label>
                <input name="search" value={this.state.search} required onChange={this.handleChange} type="text" id="search" placeholder='Search for a movice' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
    
            <Container className='resultList'>
                {this.state.isSumbitted ? resultList :""}
            </Container>
    
            </Container>
        );
        }
}

export default MainLayout;