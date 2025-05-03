update "User"
set email = concat (
    nick,
    '@vaffl.com')
    WHERE
    email is NULL;