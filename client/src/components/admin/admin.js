import React, { Component } from 'react';
import { Nav, Tab, Col, Row } from 'react-bootstrap';
import AdminMenu from './adminMenu'
import AdminArchive from './adminArchive';
class Admin extends Component {

    render() {
      return ( <div><Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
          <Nav.Item>
              <Nav.Link eventKey="first">Tab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
            <AdminMenu/>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <AdminArchive/>
           </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container></div>)
    }
}

export default Admin;
