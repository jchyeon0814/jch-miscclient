import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';

interface DataItem {
  id: number;
  label: string;
}

interface AnimationStyle {
  transform: string;
  opacity: number;
  transition: string;
}

interface GridButtonProps {
  isHovered: boolean;
  isClicked: boolean;
  isAnimating: boolean;
}

interface ControlButtonProps {
  variant: 'add' | 'remove' | 'reset';
  disabled?: boolean;
}

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background-color: #f9fafb;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1.5rem;
`;

const ControlPanel = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const ControlButton = styled.button<ControlButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  
  ${({ variant, disabled }) => {
    const variants = {
      add: 'background-color: #10b981; color: white;',
      remove: 'background-color: #ef4444; color: white;',
      reset: 'background-color: #8b5cf6; color: white;'
    };
    
    const hoverVariants = {
      add: '&:hover { background-color: #059669; }',
      remove: '&:hover { background-color: #dc2626; }',
      reset: '&:hover { background-color: #7c3aed; }'
    };
    
    return `
      ${variants[variant]}
      ${!disabled ? hoverVariants[variant] : ''}
      ${disabled ? 'opacity: 0.5; cursor: not-allowed;' : ''}
    `;
  }}
`;

const DataCount = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`;

const GridContainer = styled.div<{ columns: number; maxWidth: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  max-width: ${props => props.maxWidth}px;
  position: relative;
`;

const GridButton = styled.button<GridButtonProps>`
  width: 96px;
  height: 96px;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
  transition: all 0.2s ease;
  cursor: pointer;
  
  background-color: ${({ isClicked, isHovered }) => {
    if (isClicked) return '#eab308';
    if (isHovered) return '#1d4ed8';
    return '#3b82f6';
  }};
  
  transform: ${({ isHovered, isAnimating }) => 
    !isAnimating && isHovered ? 'scale(1.05)' : 'scale(1)'};
    
  box-shadow: ${({ isHovered, isAnimating }) => 
    !isAnimating && isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none'};
    
  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const InfoPanel = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const InfoList = styled.div`
  color: #6b7280;
  
  p {
    margin: 0.25rem 0;
  }
`;

const AnimationStatus = styled.p`
  color: #2563eb !important;
  font-weight: 600;
`;

const UsagePanel = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
`;

const UsageTitle = styled.h4`
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const UsageText = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

const TechPanel = styled.div`
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #eff6ff;
  border-radius: 0.375rem;
`;

const TechTitle = styled.h4`
  font-weight: 500;
  color: #1d4ed8;
  margin-bottom: 0.25rem;
`;

const TechText = styled.p`
  font-size: 0.875rem;
  color: #2563eb;
  line-height: 1.5;
  margin: 0;
`;

const GridButtonComponent: React.FC = () => {
  const COLUMNS: number = 4;
  
  const [data, setData] = useState<DataItem[]>([
    { id: 1, label: 'A' },
    { id: 2, label: 'B' },
    { id: 3, label: 'C' },
    { id: 4, label: 'D' },
    { id: 5, label: 'E' },
    { id: 6, label: 'F' },
    { id: 7, label: 'G' },
    { id: 8, label: 'H' },
    { id: 9, label: 'I' },
    { id: 10, label: 'J' },
  ]);

  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [clickedButton, setClickedButton] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const rows: number = Math.ceil(data.length / COLUMNS);

  const handleButtonClick = (item: DataItem): void => {
    if (isAnimating) return;
    
    console.log('클릭된 버튼:', item);
    setClickedButton(item.id);
    setIsAnimating(true);
  };

  const handleMouseEnter = (itemId: number): void => {
    if (!isAnimating) {
      setHoveredButton(itemId);
    }
  };

  const handleMouseLeave = (): void => {
    setHoveredButton(null);
  };

  const addData = (): void => {
    if (isAnimating) return;
    const newId: number = data.length + 1;
    const newLabel: string = String.fromCharCode(64 + newId);
    setData([...data, { id: newId, label: newLabel }]);
  };

  const removeData = (): void => {
    if (isAnimating) return;
    if (data.length > 0) {
      setData(data.slice(0, -1));
    }
  };

  const resetGrid = (): void => {
    setIsAnimating(false);
    setClickedButton(null);
    setHoveredButton(null);
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>
          {rows}행 {COLUMNS}열 버튼 그리드 (Emotion Styled)
        </Title>
        
        <ControlPanel>
          <ControlButton
            variant="add"
            onClick={addData}
            disabled={isAnimating}
          >
            데이터 추가
          </ControlButton>
          
          <ControlButton
            variant="remove"
            onClick={removeData}
            disabled={isAnimating}
          >
            데이터 제거
          </ControlButton>
          
          <ControlButton
            variant="reset"
            onClick={resetGrid}
          >
            리셋
          </ControlButton>
          
          <DataCount>
            총 데이터: {data.length}개
          </DataCount>
        </ControlPanel>

        <GridContainer
          ref={gridRef}
          columns={COLUMNS}
          maxWidth={COLUMNS * 96}
        >
          {data.map((item: DataItem, index: number) => {
            const row: number = Math.floor(index / COLUMNS);
            const col: number = index % COLUMNS;
            
            const centerRow: number = (rows - 1) / 2;
            const centerCol: number = (COLUMNS - 1) / 2;
            
            const deltaRow: number = centerRow - row;
            const deltaCol: number = centerCol - col;
            
            const animationStyle: AnimationStyle = isAnimating ? {
              transform: `translate(${deltaCol * 96}px, ${deltaRow * 96}px) scale(0)`,
              opacity: 0,
              transition: 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            } : {
              transform: 'translate(0, 0) scale(1)',
              opacity: 1,
              transition: 'all 0.2s ease'
            };

            return (
              <GridButton
                key={item.id}
                onClick={() => handleButtonClick(item)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredButton === item.id}
                isClicked={clickedButton === item.id}
                isAnimating={isAnimating}
                style={animationStyle}
                disabled={isAnimating}
              >
                {item.label}
              </GridButton>
            );
          })}
        </GridContainer>

        <InfoPanel>
          <InfoTitle>그리드 정보</InfoTitle>
          <InfoList>
            <p>• 총 데이터 개수: {data.length}개</p>
            <p>• 열 수 (고정): {COLUMNS}열</p>
            <p>• 행 수 (자동): {rows}행</p>
            <p>• 빈 칸: {(rows * COLUMNS) - data.length}개</p>
            {isAnimating && (
              <AnimationStatus>• 애니메이션 진행 중...</AnimationStatus>
            )}
          </InfoList>
          
          <UsagePanel>
            <UsageTitle>사용법:</UsageTitle>
            <UsageText>
              • 마우스를 버튼 위에 올리면 색상이 진해집니다.<br />
              • 버튼을 클릭하면 모든 사각형들이 가운데로 모여서 영구적으로 사라집니다.<br />
              • 리셋 버튼으로 원래 상태로 되돌릴 수 있습니다.
            </UsageText>
          </UsagePanel>
          
          <TechPanel>
            <TechTitle>기술 스택:</TechTitle>
            <TechText>
              • TypeScript로 타입 안전성 확보<br />
              • Emotion Styled Components로 스타일 캡슐화<br />
              • React Hooks로 상태 관리<br />
              • CSS-in-JS로 동적 스타일링
            </TechText>
          </TechPanel>
        </InfoPanel>
      </ContentWrapper>
    </Container>
  );
};

export default GridButtonComponent;