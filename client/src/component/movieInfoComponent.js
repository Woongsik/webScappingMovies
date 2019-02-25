import React, {Component} from 'react';
import {Header, Table} from 'semantic-ui-react';
import './MovieComponent.css';

class MovieInfoComponent extends Component {

    render(){
        return (    
            <Table.Row style={{padding: '15px'}}>
                <Table.Cell >
                    <Header as='h4' >
                        {this.props.propertyName.toUpperCase()}
                    </Header>
                </Table.Cell>
                <Table.Cell style={{textAlign: 'left', paddingLeft: '20px'}}>
                    {this.props.propertyValue}
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default MovieInfoComponent;

