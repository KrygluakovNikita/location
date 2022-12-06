export const convertPostDate = (postDate: Date) => {
  const postLocaleDate = new Date(postDate).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });
  const postLocaleTime = new Date(postDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return { postLocaleDate, postLocaleTime };
};

export const convertGameDate = (gameDate: Date) => {
  const gameLocaleDate = new Date(gameDate).toLocaleDateString('ru-RU', { month: '2-digit', day: 'numeric', year: 'numeric' });
  const gameLocaleTime = new Date(gameDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return {
    gameLocaleDate,
    gameLocaleTime,
  };
};
