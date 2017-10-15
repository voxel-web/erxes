import React from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Wrapper } from '/imports/react-ui/layout/components';
import { List as InternalNotes } from '/imports/react-ui/internalNotes/containers';
import LeftSidebar from './LeftSidebar';

const propTypes = {
  company: PropTypes.object.isRequired,
  customFields: PropTypes.array.isRequired,
  save: PropTypes.func.isRequired,
  queryParams: PropTypes.object.isRequired,
};

class CompanyDetails extends React.Component {
  render() {
    const { company } = this.props;

    const breadcrumb = [
      { title: 'Companies', link: FlowRouter.path('companies/list') },
      { title: company.name || company.email || 'N/A' },
    ];

    const content = (
      <div className="cc-detail-content">
        <ul className="header">
          <li className="active">
            <a>
              <i className="ion-email" />
              New note
            </a>
          </li>
        </ul>

        {<InternalNotes contentType="company" contentTypeId={company._id} />}
      </div>
    );

    return (
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        leftSidebar={<LeftSidebar {...this.props} />}
        content={content}
      />
    );
  }
}

CompanyDetails.propTypes = propTypes;

export default CompanyDetails;