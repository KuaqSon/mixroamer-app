import { createStyles, Title, Text, Anchor } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import RegisterForm from 'components/register-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { registerApi } from 'src/utils/api';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundImage:
      // eslint-disable-next-line max-len
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]}`,
    minHeight: '100vh',
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function RegisterContainer() {
  const { classes } = useStyles();
  const router = useRouter();
  const { mutate, isLoading } = useMutation((data: any) => registerApi(data), {
    onSuccess: (resp) => {
      if (resp.status === 200) {
        showNotification({
          id: 'register-successfully',
          title: 'Congratulations 🎉🎉',
          message: 'Your account has been registered successfully!',
        });
        router.push('/account/login');
      } else {
        showNotification({
          id: 'register-successfully',
          title: 'Oops! 😞',
          message: resp?.data?.message || 'Something went wrong! Please try again later.',
          color: 'red',
        });
      }
    },
    onError: (resp: AxiosResponse) => {
      showNotification({
        id: 'register-successfully',
        title: 'Oops! Something went wrong 😞',
        message: resp?.data?.message || 'Please try again later.',
        color: 'red',
      });
    },
  });

  return (
    <>
      <Title order={2} className={classes.title} align="center" mt="md">
        Sign Up
      </Title>
      <Text mb={50} align="center">
        To enjoy all of our cool features
      </Text>

      <RegisterForm submitting={isLoading} onSubmit={mutate} />

      <Text align="center" mt="md">
        Already Registered?{' '}
        <Link href="/account/login">
          <Anchor>Login</Anchor>
        </Link>
      </Text>
    </>
  );
}
