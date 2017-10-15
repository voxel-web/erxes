import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination, ModalTrigger } from '/imports/react-ui/common';
import Sidebar from './Sidebar';
import CompanyRow from './CompanyRow';
import CompanyForm from './CompanyForm';

const propTypes = {
  companies: PropTypes.array.isRequired,
  counts: PropTypes.object.isRequired,
  columnsConfig: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  bulk: PropTypes.array.isRequired,
  toggleBulk: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired,
};

function CompaniesList({
  companies,
  counts,
  columnsConfig,
  loadMore,
  hasMore,
  toggleBulk,
  addCompany,
}) {
  const content = (
    <Pagination hasMore={hasMore} loadMore={loadMore}>
      <Table className="no-wrap">
        <thead>
          <tr>
            <th />
            <th>
              <a href="/companies/manage-columns">...</a>
            </th>
            {columnsConfig.map(({ name, label }) => <th key={name}>{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {companies.map(company => (
            <CompanyRow
              company={company}
              columnsConfig={columnsConfig}
              key={company._id}
              toggleBulk={toggleBulk}
            />
          ))}
        </tbody>
      </Table>
    </Pagination>
  );

  const addTrigger = (
    <Button bsStyle="link">
      <i className="ion-plus-circled" /> New company
    </Button>
  );

  const actionBarLeft = (
    <ModalTrigger title="New company" trigger={addTrigger}>
      <CompanyForm addCompany={addCompany} />
    </ModalTrigger>
  );

  const actionBar = <Wrapper.ActionBar left={actionBarLeft} />;
  const breadcrumb = [{ title: `Companies (${counts.all})` }];

  return (
    <div>
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        actionBar={actionBar}
        leftSidebar={<Sidebar counts={counts} />}
        content={content}
      />
    </div>
  );
}

CompaniesList.propTypes = propTypes;

export default CompaniesList;