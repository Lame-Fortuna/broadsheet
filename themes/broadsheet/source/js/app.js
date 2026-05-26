(function () {
  const stacks = Array.from(document.querySelectorAll('.story-stack'));

  if (!stacks.length) return;

  function columnCount() {
    if (window.innerWidth >= 1600) return 3;
    if (window.innerWidth >= 900) return 2;
    return 1;
  }

  function getCards(stack) {
    if (!stack.__storyCards) {
      stack.__storyCards = Array.from(stack.querySelectorAll(':scope > .story-card'));
    }

    return stack.__storyCards;
  }

  function resetStack(stack, cards) {
    stack.classList.remove('is-balanced-masonry');
    stack.style.removeProperty('--story-columns');
    stack.replaceChildren(...cards);
  }

  function shortestColumnIndex(heights) {
    return heights.reduce(function (shortestIndex, height, index) {
      return height < heights[shortestIndex] ? index : shortestIndex;
    }, 0);
  }

  function measureCards(cards, columnWidth) {
    const measurer = document.createElement('div');

    measurer.className = 'story-masonry-column';
    measurer.style.position = 'absolute';
    measurer.style.left = '-9999px';
    measurer.style.top = '0';
    measurer.style.visibility = 'hidden';
    measurer.style.width = `${columnWidth}px`;
    document.body.appendChild(measurer);

    const measurements = cards.map(function (card, index) {
      measurer.appendChild(card);

      return {
        card,
        index,
        height: card.getBoundingClientRect().height
      };
    });

    measurer.remove();
    return measurements;
  }

  function balanceStack(stack) {
    const cards = getCards(stack);
    const columns = Math.min(columnCount(), cards.length);

    if (columns <= 1) {
      resetStack(stack, cards);
      return;
    }

    const columnEls = Array.from({ length: columns }, function () {
      const column = document.createElement('div');
      column.className = 'story-masonry-column';
      return column;
    });
    const columnHeights = Array(columns).fill(0);

    stack.classList.add('is-balanced-masonry');
    stack.style.setProperty('--story-columns', columns);
    stack.replaceChildren(...columnEls);

    const columnWidth = columnEls[0].getBoundingClientRect().width ||
      (stack.getBoundingClientRect().width / columns);
    const measurements = measureCards(cards, columnWidth);
    const assignments = Array.from({ length: columns }, function () {
      return [];
    });
    const firstCard = measurements.shift();

    if (firstCard) {
      assignments[0].push(firstCard);
      columnHeights[0] = firstCard.height;
    }

    measurements.sort(function (first, second) {
      return second.height - first.height;
    }).forEach(function (item) {
      const targetIndex = shortestColumnIndex(columnHeights);

      assignments[targetIndex].push(item);
      columnHeights[targetIndex] += item.height;
    });

    assignments.forEach(function (items, index) {
      items.sort(function (first, second) {
        return first.index - second.index;
      }).forEach(function (item) {
        columnEls[index].appendChild(item.card);
      });
    });
  }

  let frame = 0;
  let width = window.innerWidth;

  function balanceAll() {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        stacks.forEach(balanceStack);
      });
    });
  }

  stacks.forEach(function (stack) {
    getCards(stack).forEach(function (card) {
      card.querySelectorAll('img').forEach(function (image) {
        if (!image.complete) {
          image.addEventListener('load', balanceAll, { once: true });
          image.addEventListener('error', balanceAll, { once: true });
        }
      });
    });
  });

  balanceAll();
  window.addEventListener('load', balanceAll);
  window.addEventListener('pageshow', balanceAll);
  window.addEventListener('resize', function () {
    if (window.innerWidth === width) return;
    width = window.innerWidth;
    balanceAll();
  }, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(balanceAll);
  }
})();
