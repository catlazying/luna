import React, {ReactNode, useEffect, useState} from 'react';
import {
  Button,
  isClient,
  Paragraph,
  XStack,
  YStack,
  AnimatePresence,
} from 'tamagui';
import {Menu} from '@tamagui/lucide-icons';
import {Logo} from './Logo';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({children}: ILayout) => {
  const [openMenu, setOpenMenu] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setOpenMenu(x => !x);

  useEffect(() => {
    if (isClient) {
      const onScroll = () => {
        setIsScrolled(window.scrollY > 30);
      };
      window.addEventListener('scroll', onScroll, {passive: true});
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <YStack f={1}>
      <AnimatePresence>
        {openMenu && (
          <YStack
            key={'drawer-menu'}
            onPress={toggleMenu}
            enterStyle={{left: '-75%'}}
            animation={'slow'}
            position={'absolute'}
            backgroundColor={'$background'}
            width={'75%'}
            height={'100%'}
            left={0}
            zi={5000}
            exitStyle={{left: '-75%'}}>
            <Paragraph minWidth={200} bbc={'$borderColor'}>
              Drawer menu
            </Paragraph>
          </YStack>
        )}
      </AnimatePresence>
      <XStack
        elevation={isScrolled ? 0 : '$1'}
        py={isScrolled ? '$0' : '$2'}
        my={isScrolled ? -2 : 0}
        bbc="$borderColor"
        space={5}
        paddingHorizontal="$2">
        <Button
          aria-label={'drawer-menu-button'}
          size="$5"
          $md={{size: '$3'}}
          $gtMd={{display: 'none'}}
          icon={Menu}
          alignSelf="center"
          space={2}
          scaleIcon={1.5}
          hoverStyle={{scale: 1.1}}
          animation={'fast'}
          onPress={toggleMenu}
        />
        <Logo />
      </XStack>
      <YStack height={54} w="100%" />
      {children}
    </YStack>
  );
};
