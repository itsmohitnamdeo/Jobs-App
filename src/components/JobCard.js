import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

const JobCard = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="mb-4" style={{ backgroundColor: '#f8f9fa', padding: '20px' }}>
      <CardBody>
        <CardTitle tag="h5">{job.title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{job.company}</CardSubtitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">{job.location}</CardSubtitle>
        <CardText>{expanded ? job.description : job.description.slice(0, 100) + '...'}</CardText>
        {job.description.length > 100 && (
          <Button color="link" onClick={toggleExpand}>
            {expanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
        <CardText>Experience: {job.experience}</CardText>
        <Button color="primary">Apply</Button>
      </CardBody>
    </Card>
  );
}

export default JobCard;
