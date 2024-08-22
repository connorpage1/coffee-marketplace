import { Container, Header, Image, Grid } from 'semantic-ui-react';

const Landing = () => {
    return (
        <div className="landing-page">
            <div className="hero-section">
                <Container textAlign="center">
                    <Header as="h1" className="hero-title">
                        Welcome to Coffee and Tea Marketplace
                    </Header>
                    <p className="hero-subtitle">
                        Discover the finest coffee beans and premium tea leaves sourced from around the world.
                    </p>
                </Container>
            </div>
            <div className="about-section">
                <Container>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Image src="https://thequeenbean.blog/wp-content/uploads/2019/03/lifebean.jpg?w=1400" alt="Coffee Beans" fluid />
                                <Header as="h3">Premium Coffee Beans</Header>
                                <p>
                                    Our coffee beans are sourced from the finest farms, offering a rich and aromatic experience in every cup.
                                </p>
                            </Grid.Column>
                            <Grid.Column>
                                <Image src="https://now.tufts.edu/sites/default/files/uploaded-assets/images/2022-04/150925_tea_shutterstock_1751704043_lg.jpg" alt="Tea Leaves" fluid />
                                <Header as="h3">Exquisite Tea Leaves</Header>
                                <p>
                                    Enjoy a diverse selection of tea leaves, hand-picked for their superior flavor and quality.
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
            <div className="footer">
                <Container textAlign="center">
                    <p>&copy; 2024 Coffee and Tea Marketplace. All Rights Reserved.</p>
                </Container>
            </div>
        </div>
    );
};

export default Landing;