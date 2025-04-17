
import React from 'react';
import Layout from '../components/Layout';
import EquipmentDisplay from '../components/equipment/EquipmentDisplay';

const Equipment = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Gym Equipment</h1>
        <EquipmentDisplay />
      </div>
    </Layout>
  );
};

export default Equipment;
