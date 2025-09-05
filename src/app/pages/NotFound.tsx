import React from 'react';
import PageContainer from '../components/PageContainer';

const NotFound: React.FC = () => {
    return (
        <PageContainer>
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4 font-quicksand">404</h1>
                <p className="text-2xl font-ubuntu">Page Not Found</p>
            </div>
        </PageContainer>
    );
};

export default NotFound;
