import { Screen } from '@/shared/ui';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';
import { fontSize, semanticColors } from '@app/design-tokens';
import {
  Bookmark,
  List,
  CircleCheck,
  ChartNoAxesColumnIncreasing,
  LogOut,
} from 'lucide-react-native';
import { useAuthStore } from '@/features/auth';
import {
  Avatar,
  BadgeRole,
  ProfileMenuItem,
  ProfileMenuSection,
  ProfileStats,
  useCurrentUser,
} from '@/features/profile';

export default function ProfileScreen() {
  const { data: user } = useCurrentUser();
  const signOut = useAuthStore((state) => state.signOut);

  const handleSignOut = async () => {
    await signOut();
  };

  const displayName = user?.profile?.displayName ?? user?.username ?? 'User';

  return (
    <Screen edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="never">
        <View style={styles.hero}>
          <Image
            source={require('@/assets/images/project-images/profile/background.png')}
            style={styles.heroBackground}
            contentFit="cover"
          />
          <View style={styles.profileInfo}>
            <Avatar />
            <View style={styles.profileNameContainer}>
              <View style={styles.profileNameTextContainer}>
                <Text style={styles.userName}>{displayName}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
              </View>
              <BadgeRole role={user?.role ?? 'user'} />
            </View>
          </View>
        </View>
        <ProfileStats completed={42} inProgress={18} watchlist={12} />
        <View style={styles.menu}>
          <ProfileMenuSection>
            <ProfileMenuItem icon={Bookmark} label="My Collections" onPress={() => {}} />

            <ProfileMenuItem icon={List} label="Watchlist" onPress={() => {}} />

            <ProfileMenuItem icon={CircleCheck} label="History" onPress={() => {}} />

            <ProfileMenuItem
              icon={ChartNoAxesColumnIncreasing}
              label="Statistics"
              showDivider={false}
              onPress={() => {}}
            />
          </ProfileMenuSection>

          <ProfileMenuSection>
            <ProfileMenuItem
              icon={LogOut}
              label="Log Out"
              danger
              showDivider={false}
              onPress={() => void handleSignOut()}
            />
          </ProfileMenuSection>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 250,
    position: 'relative',
    overflow: 'hidden',
  },

  heroBackground: {
    ...StyleSheet.absoluteFill,
  },

  profileInfo: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  profileNameContainer: {
    gap: 16,
  },

  profileNameTextContainer: {
    gap: 4,
  },

  userName: {
    fontSize: fontSize['2xl'],
    fontWeight: 'bold',
    color: 'white',
  },

  userEmail: {
    fontSize: fontSize.md,
    color: semanticColors.text['little-muted'],
  },

  menu: {
    gap: 26,

    paddingHorizontal: 6,
    paddingTop: 28,
    paddingBottom: 40,
  },
});
