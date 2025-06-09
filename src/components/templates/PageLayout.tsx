import styled from '@emotion/styled';
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

const PageLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 1200px;
    width: 100%;
`;

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <PageLayoutContainer>
            <Header />
            {children}
            <Footer />
        </PageLayoutContainer>
    );
};