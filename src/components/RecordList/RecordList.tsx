import React, {useMemo} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useExpandableStateContext} from "../../context";
import {useFetchAlbums, useFetchUsers} from "../../hooks";
import {ExpandedAlbumView} from "../../components";
import {IAlbum, IUser} from "../../types";
import {Badge, Button, Heading, Stack, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import styled from "@emotion/styled";

interface IContainerProps {
    isExpanded: boolean;
}

const CardsViewContainer = styled.div<IContainerProps>`
  background-color: #333344;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const NormalCard = styled(motion.div)`
  margin: 10px;
  height: 360px;
  width: 240px;
  position: relative;

  h2 {
    text-transform: capitalize;
    font-size: 18px;
    padding: 5px;
    text-align: center;
  }
`

const CardContent = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  background: #1c1c1e;
  overflow: hidden;
  width: 100%;
  height: 100%;
`

function Card(item: IAlbum) {
    const {handleToggleExpandAlbum} = useExpandableStateContext();
    const onToggleExpand = () => {
        handleToggleExpandAlbum(item.id);
    }

    return (
        <NormalCard>
            <CardContent layoutId={`card-container-${item.id}`}>
                <Stack height={'full'} p={4} justify={'space-between'}>
                    <Badge textAlign={'center'} fontSize={'4xl'}
                           colorScheme='purple'>{item.id} </Badge>
                    <Heading size={"sm"}> {item.title}
                    </Heading>
                    <Text>
                        {item.user.name}
                    </Text>
                    <Text>{item.user.email}</Text>
                    <motion.div layoutId={`card-toggle-container-open-${item.id}`}>
                        <Button width={'100%'} onClick={onToggleExpand}><AddIcon boxSize={6}/></Button>
                    </motion.div>
                </Stack>
            </CardContent>
        </NormalCard>
    );
}

export function RecordList() {
    const items = useFetchAlbums();
    const users = useFetchUsers();
    const {expandedAlbumId} = useExpandableStateContext();

    const itemsWithUserData = useMemo(() => {
        if (!users.length || !items.length) return ([]);
        return items.map((item) => {
            const user: IUser = users.find((user) => user.id === item.userId) as IUser;
            return {
                ...item,
                user,
            };
        });
    }, [users, items]);

    return (
        <>
            <AnimatePresence>
                {expandedAlbumId && <ExpandedAlbumView key="item"/>}
            </AnimatePresence>
            <CardsViewContainer isExpanded={expandedAlbumId !== null}>
                {itemsWithUserData.map((card, index) => (
                    <Card key={card.id} {...card} />
                ))}
            </CardsViewContainer>
        </>
    );
}

export default RecordList;