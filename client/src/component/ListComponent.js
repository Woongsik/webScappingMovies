import React, {Component} from 'react';
import {List, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class ListComponent extends Component {
    render(){
        const {info} = this.props;
        const {search} = this.props;
        return (
            <List>
                <List.Item>
                    <Image src={info.image} />
                    <List.Content>
                        <List.Header>
                            <Link style={{color: 'white'}}to={"/movieInfo/"+ search +"/"+ info.imdbId}>{info.title}</Link>
                        </List.Header>
                    </List.Content>
                </List.Item>  
            </List>
        )
    }
}

export default ListComponent;