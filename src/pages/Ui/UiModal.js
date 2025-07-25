import React, { Component } from "react";
import { Row, Col, Card, CardBody, Modal,Container, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class UiModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      modal_standard: false,
      modal_large: false,
      modal_xlarge: false,
      modal_small: false,
      modal_center: false,
      modal_scroll: false,
      modal_static: false,
      modal_fullscreen: false,
      breadcrumbItems : [
        { title : "UI Elements", link : "#" },
        { title : "Modals", link : "#" },
    ],
    };
    this.tog_standard = this.tog_standard.bind(this);
    this.tog_xlarge = this.tog_xlarge.bind(this);
    this.tog_large = this.tog_large.bind(this);
    this.tog_small = this.tog_small.bind(this);
    this.tog_center = this.tog_center.bind(this);
    this.tog_scroll = this.tog_scroll.bind(this);
    this.tog_static = this.tog_static.bind(this);
    this.tog_fullscreen = this.tog_fullscreen.bind(this);
  }

  tog_static() {
    this.setState(prevState => ({
      modal_static: !prevState.modal_static
    }));
    this.removeBodyCss();
  }

  tog_fullscreen() {
    this.setState(prevState => ({
      modal_fullscreen: !prevState.modal_fullscreen
    }));
    this.removeBodyCss();
  }

  tog_standard() {
    this.setState(prevState => ({
      modal_standard: !prevState.modal_standard
    }));
    this.removeBodyCss();
  }
  removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  tog_large() {
    this.setState(prevState => ({
      modal_large: !prevState.modal_large
    }));
    this.removeBodyCss();
  }
  tog_xlarge() {
    this.setState(prevState => ({
      modal_xlarge: !prevState.modal_xlarge
    }));
    this.removeBodyCss();
  }
  tog_small() {
    this.setState(prevState => ({
      modal_small: !prevState.modal_small
    }));
    this.removeBodyCss();
  }
  tog_center() {
    this.setState(prevState => ({
      modal_center: !prevState.modal_center
    }));
    this.removeBodyCss();
  }
  tog_scroll() {
    this.setState(prevState => ({
      modal_scroll: !prevState.modal_scroll
    }));
    this.removeBodyCss();
  }
  show() {
    this.setState({ visible: true });
  }
  hide() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>

          <Breadcrumbs title="Modals" breadcrumbItems={this.state.breadcrumbItems} />

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <h4 className="card-title">Modals Examples</h4>
                    <p className="card-title-desc">
                      Modals are streamlined, but flexible dialog prompts powered by JavaScript. They support a number of use cases from user notification to completely custom content and feature a handful of helpful subcomponents, sizes, and more.
                    </p>

                    <div className="modal bs-example-modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title mt-0">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>One fine body&hellip;</p>
                                </div>
                                <div className="modal-footer">
                                    <Button type="button" color="primary" className="waves-effect waves-light">Save changes</Button>
                                    <Button type="button" color="light" className="waves-effect" data-dismiss="modal">Close</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row>
                      <Col sm={6} md={4} xl={3} className="mt-4">
                        <div className="text-center">
                          <p className="text-muted">Standard Modal</p>
                          <Button
                            type="button"
                            onClick={this.tog_standard}
                            color="primary" className="waves-effect waves-light"
                          >
                            Standard Modal
                        </Button>
                        </div>

                        <Modal
                          isOpen={this.state.modal_standard}
                          toggle={this.tog_standard}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_standard: false })}>
                              Modal Heading
                          </ModalHeader>
                          <ModalBody>
                            <h5>Overflowing text to show scroll behavior</h5>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur ac,
                              vestibulum at eros.
                          </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Vivamus sagittis lacus vel augue
                              laoreet rutrum faucibus dolor auctor.
                          </p>
                            <p>
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                          </p>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur ac,
                              vestibulum at eros.
                          </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Vivamus sagittis lacus vel augue
                              laoreet rutrum faucibus dolor auctor.
                          </p>
                            <p>
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                          </p>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              type="button"
                              onClick={this.tog_standard}
                              color="light"
                              className="waves-effect"
                            >
                              Close
                          </Button>
                            <Button
                              type="button"
                              color="primary" className="waves-effect waves-light"
                            >
                              Save changes
                          </Button>
                          </ModalFooter>
                        </Modal>
                      </Col>

                      <Col sm={6} md={4} xl={3} className="mt-4">
                        <div className="text-center">
                          <p className="text-muted">Extra large modal</p>

                          <Button
                            type="button"
                            onClick={this.tog_xlarge}
                            color="primary" className="waves-effect waves-light"
                          >
                           Extra large modal
                        </Button>
                        </div>

                        <Modal
                          size="xl"
                          isOpen={this.state.modal_xlarge}
                          toggle={this.tog_xlarge}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_xlarge: false })}>
                              Extra large modal
                          
                          </ModalHeader>
                          <ModalBody>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur ac,
                              vestibulum at eros.
                          </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Vivamus sagittis lacus vel augue
                              laoreet rutrum faucibus dolor auctor.
                          </p>
                            <p className="mb-0">
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                          </p>
                          </ModalBody>
                        </Modal>
                      </Col>

                      <Col sm={6} md={4} xl={3} className="mt-4">
                        <div className="text-center">
                          <p className="text-muted">Large modal</p>

                          <Button
                            type="button"
                            onClick={this.tog_large}
                            color="primary" className="waves-effect waves-light"
                          >
                            Large modal
                        </Button>
                        </div>

                        <Modal
                          size="lg"
                          isOpen={this.state.modal_large}
                          toggle={this.tog_large}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_large: false })}>
                              Large Modal
                          
                          </ModalHeader>
                          <ModalBody>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur ac,
                              vestibulum at eros.
                          </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Vivamus sagittis lacus vel augue
                              laoreet rutrum faucibus dolor auctor.
                          </p>
                            <p className="mb-0">
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                          </p>
                          </ModalBody>
                        </Modal>
                      </Col>

                      <Col sm={6} md={4} xl={3} className="mt-4">
                        <div className="text-center">
                          <p className="text-muted">Small modal</p>

                          <Button
                            type="button"
                            onClick={this.tog_small}
                            color="primary" className="waves-effect waves-light"
                            data-toggle="modal"
                            data-target=".bs-example-modal-sm"
                          >
                            Small modal
                        </Button>
                        </div>

                        <Modal
                          size="sm"
                          isOpen={this.state.modal_small}
                          toggle={this.tog_small}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_small: false })}>
                              Small Modal
                          </ModalHeader>
                          <ModalBody>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur ac,
                              vestibulum at eros.
                          </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Vivamus sagittis lacus vel augue
                              laoreet rutrum faucibus dolor auctor.
                          </p>
                            <p className="mb-0">
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                          </p>
                          </ModalBody>
                        </Modal>
                      </Col>

                      <Col sm={6} md={4} xl={3} className="mt-4">
                        <div className="my-4 text-center">
                          <p className="text-muted">Center modal</p>

                          <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            onClick={this.tog_center}
                          >
                            Center modal
                        </Button>
                        </div>

                        <Modal
                          isOpen={this.state.modal_center}
                          toggle={this.tog_center}
                          centered={true}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_center: false })}>
                            Center Modal
                          </ModalHeader>
                          <ModalBody>
                            <p>
                              Cras mattis consectetur purus sit amet fermentum.
                              Cras justo odio, dapibus ac facilisis in, egestas
                              eget quam. Morbi leo risus, porta ac consectetur ac,
                              vestibulum at eros.
                          </p>
                            <p>
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Vivamus sagittis lacus vel augue
                              laoreet rutrum faucibus dolor auctor.
                          </p>
                            <p className="mb-0">
                              Aenean lacinia bibendum nulla sed consectetur.
                              Praesent commodo cursus magna, vel scelerisque nisl
                              consectetur et. Donec sed odio dui. Donec
                              ullamcorper nulla non metus auctor fringilla.
                          </p>
                          </ModalBody>
                        </Modal>
                      </Col>

                      <Col sm={6} md={4} xl={3} className="mt-4">
                        <div className="my-4 text-center">
                          <p className="text-muted">Scrollable modal</p>

                          <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            onClick={this.tog_scroll}
                            data-toggle="modal"
                          >
                            Scrollable modal
                        </Button>
                        </div>

                        <Modal
                          isOpen={this.state.modal_scroll}
                          toggle={this.tog_scroll}
                          scrollable={true}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_scroll: false })}>
                            Scrollable modal
                          </ModalHeader>
                          <ModalBody>
                          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                          <ModalFooter>
                          <Button type="button" color="light" onClick={() => this.setState({ modal_scroll: false }) }>Close</Button>
                          <Button type="button" color="primary">Save changes</Button>
                          </ModalFooter>                                 
                          </ModalBody>
                        </Modal>
                      </Col>

                      <Col sm={6} md={4} xl={3} className="mt-4">
                        <div className="my-4 text-center">
                          <p className="text-muted">Static backdrop modal</p>

                          <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            onClick={this.tog_static}
                          >
                            Static Backdrop
                        </Button>
                        </div>

                        <Modal
                          isOpen={this.state.modal_static}
                          toggle={this.tog_static}
                          backdrop="static"
                        >
                          <ModalHeader toggle={() => this.setState({ modal_static: false })}>
                          Static Backdrop
                          </ModalHeader>
                          <ModalBody>
                            <p>
                            I will not close if you click outside me. Don't even try to press escape key.
                          </p>
                          <ModalFooter>
                            <Button type="button" color="light" onClick={() => this.setState({ modal_static: false }) }>Close</Button>
                            <Button type="button" color="primary">Save</Button>
                          </ModalFooter>  
                          </ModalBody>
                        </Modal>
                      </Col>
                    
                      <Col sm={6} md={4} xl={3} className="mt-4">
                        
                        <div className="my-4 text-center">
                          <p className="text-muted">Fullscreen Modal</p>

                          <Button
                            type="button"
                            color="primary" className="waves-effect waves-light"
                            onClick={this.tog_fullscreen}
                          >
                            Fullscreen Modal
                        </Button>
                        </div>

                        <Modal
                          size="xl"
                          isOpen={this.state.modal_fullscreen}
                          toggle={this.tog_fullscreen}
                          
                          className="modal-fullscreen"
                        >
                          <div className="modal-header">
                            <h5
                              className="modal-title mt-0"
                              id="exampleModalFullscreenLabel"
                            >
                              Fullscreen Modal
                                </h5>
                            <button
                              onClick={() => this.setState({ modal_fullscreen: false }) }
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <h5>Overflowing text to show scroll behavior</h5>
                            <p>Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Morbi leo risus, porta ac
                                                                    consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Vivamus sagittis lacus vel
                                                                    augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur.
                            Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor
                                                                    fringilla.</p>
                            <p>Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Morbi leo risus, porta ac
                                                                    consectetur ac, vestibulum at eros.</p>
                            <p>Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Vivamus sagittis lacus vel
                                                                    augue laoreet rutrum faucibus dolor auctor.</p>
                            <p>Aenean lacinia bibendum nulla sed consectetur.
                            Praesent commodo cursus magna, vel scelerisque
                            nisl consectetur et. Donec sed odio dui. Donec
                            ullamcorper nulla non metus auctor
                                                                    fringilla.</p>
                            <p>Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in,
                            egestas eget quam. Morbi leo risus, porta ac
                                                                    consectetur ac, vestibulum at eros.</p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              onClick={() => this.setState({ modal_fullscreen: false }) }
                              className="btn btn-secondary "
                              data-dismiss="modal"
                            >
                              Close
                                      </button>
                            <button
                              type="button"
                              className="btn btn-primary "
                            >
                              Save changes
                                      </button>
                          </div>
                        </Modal>
                            
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <h4 className="card-title">Toggle between modals</h4>
                    <p className="card-title-desc">Toggle between multiple modals with some clever placement of the <code>data-bs-target</code> and <code>data-bs-toggle</code> attributes.</p>
                    <div>
                      <Button type="button" color="primary" className="waves-effect waves-light">Open First Modal</Button>
                      <Modal className="fade" id="firstmodal" style={{display: "none"}}>
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Modal 1</h5>
                              <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                            </div>
                            <div className="modal-body">
                              <p>Show a second modal and hide this one with the button below.</p>
                            </div>
                            <div className="modal-footer">
                              <Button color="primary">Open Second Modal</Button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                          
                      <Modal className="fade" id="secondmodal" style={{display: "none"}}>
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Modal 2</h5>
                              <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                            </div>
                            <div className="modal-body">
                              <p>Hide this modal and show the first with the button below.</p>
                            </div>
                            <div className="modal-footer">
                              <Button color="primary">Back to First</Button>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default UiModal;
