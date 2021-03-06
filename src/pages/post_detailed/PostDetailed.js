import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {Comment} from '../../components/comment/Comment';
import './PostDetailed.css';

const PostDetailed = (props) => {
  const [storyData, changeStoryData] = useState(null);
  const [loading, changeLoading] = useState(false);
  const {storyId} = props.match.params;

  useEffect(() => {
    changeLoading(true);
    axios.get(`http://hn.algolia.com/api/v1/items/${storyId}`).
        then(response => {
          changeStoryData(response.data);
        }).
        catch(errors => {
          console.log(errors);
        }).finally(() => changeLoading(false));
  }, []);

  if (loading) return <>
    <ReactLoading
        type={'spin'}
        color={'red'}
        height={40}
        width={40}
        className="post-detailed-circle"
    />
    <p className="text-center">Loading...</p>
  </>;

  if (storyData === null) return <Alert variant={'danger'}>No data found!</Alert>;

  const {title, author, url, children} = storyData;
  const buildComments = children.map(comment => {
    if (comment.text !== null && comment.text !== '') {
      return <Comment data={comment} key={comment.id}/>;
    }
  });

  return (
      <div className="post-detailed-section">
        <div className="post-detailed-header">
          <Container>
            <Row>
              <Col xs={12}>
                <Link to="/" style={{color: '#ffffff'}}>{'< Back'}</Link>
                <h4 style={{marginTop: 10}}>{title}</h4>
                <br/>
                <Row>
                  <Col xs={2}>
                    <p><span className="w100">Author :</span></p>
                  </Col>
                  <Col xs={10}>
                    <p>{author}</p>
                  </Col>
                  <Col xs={2}>
                    <p><span className="w100">URL :</span></p>
                  </Col>
                  <Col xs={10}>
                    <p>{url}</p>
                  </Col>
                </Row>
                <br/>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="post-detailed-body">
          <Container>
            <Row>
              <Col xs={12}>
                <h5>Comments :</h5>
              </Col>
              <Col xs={12}>
                {buildComments}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
  );

};

export default PostDetailed;
